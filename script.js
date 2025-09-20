const container = document.querySelector(".container");
const chatsContainer = document.querySelector(".chats-container");
const promptForm = document.querySelector(".prompt-form");
const promptInput = promptForm.querySelector(".prompt-input");
const fileInput = promptForm.querySelector("#file-input");
const fileUploadWrapper = promptForm.querySelector(".file-upload-wrapper");
const themeToggle = document.querySelector("#theme-toggle-btn");

//API Setup
const API_KEY="AIzaSyBwmMfn3LS4WMB-o89wHknIo1ZGCrkCS7g";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;  

let typingInterval, controller;
const chatHistory =[];
const userData = { message: "", file :{}};
let lastStoppedResponse = null; // Store the last stopped response for continuation

// Get current date and time for context
const getCurrentDateTime = () => {
    const now = new Date();
    return {
        date: now.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }),
        time: now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZoneName: 'short'
        }),
        timestamp: now.toISOString()
    };
};

// Function to create message elements
const createMsgElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

// Scroll to the bottom the container
const scrollToBottom = () => container.scrollTo({top: container.scrollHeight, behavior:"smooth"});

// Simulate typing effect for bot responses
const typingEffect = (text, textElement, botMsgDiv) => {
    textElement.textContent = "";
    const words = text.split(" ");
    let wordIndex = 0;

    //Set an interval to type each word
    typingInterval = setInterval(() =>{
        if(wordIndex < words.length) {
            textElement.textContent += (wordIndex === 0 ? "" : " ") + words[wordIndex++];
            botMsgDiv.classList.remove("loading");
            scrollToBottom();
        }else {
            clearInterval(typingInterval);
            botMsgDiv.classList.remove("loading");
            document.body.classList.remove("bot-responding");
        }
    }, 40);
}

// Validate and clean response text
const validateResponse = (text) => {
    // Check for outdated date patterns
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    
    // Replace outdated year references
    let cleanedText = text.replace(new RegExp(`\\b${lastYear}\\b`, 'g'), currentYear);
    
    // Check for common outdated patterns
    const outdatedPatterns = [
        { pattern: /(as of|currently|today is|current date is).*202[0-3]/gi, replacement: `as of ${getCurrentDateTime().date}` },
        { pattern: /(in|by|since) 202[0-3]/gi, replacement: `in ${currentYear}` },
        { pattern: /(last year|previous year)/gi, replacement: `${lastYear}` }
    ];
    
    outdatedPatterns.forEach(({ pattern, replacement }) => {
        cleanedText = cleanedText.replace(pattern, replacement);
    });
    
    return cleanedText;
};

//Make the API call and generate the bot's response
const generateResponse = async (botMsgDiv, isContinuation = false) =>{
    const textElement = botMsgDiv.querySelector(".message-text");
    controller = new AbortController();

    // Get current context
    const currentContext = getCurrentDateTime();
    
    // Create system prompt for current information
    const systemPrompt = `You are Gemini AI, a helpful assistant. IMPORTANT: 
    - Current date is ${currentContext.date}
    - Current time is ${currentContext.time}
    - Current year is ${new Date().getFullYear()}
    - Always provide accurate, up-to-date information
    - If you're unsure about current information, say so rather than guessing
    - For time-sensitive queries, mention that information may change
    - Be precise with dates and current events`;

    // Create the parts array with proper structure for file attachments
    const parts = [{ text: userData.message }];
    if (userData.file.data) {
        parts.push({
            inlineData: {
                data: userData.file.data,
                mimeType: userData.file.mime_type
            }
        });
    }

    // Add system context and user message to chat history
    if (!isContinuation) {
        // Add system message for context
        chatHistory.push({
            role: "user",
            parts: [{ text: systemPrompt }]
        });
        
        chatHistory.push({
            role: "model", 
            parts: [{ text: "I understand. I'll provide accurate, current information based on the context you've provided." }]
        });
        
        chatHistory.push({
            role: "user",
            parts: parts
        });
    }

    try {
        //Send the chat History to the API to get a response
        const response = await fetch(API_URL, {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ 
                contents: chatHistory,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            }),
            signal: controller.signal
        });

        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message);

        //Process the response text and validate it
        let responseText = data.candidates[0].content.parts[0].text.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
        
        // Validate and clean the response
        responseText = validateResponse(responseText);
        
        typingEffect(responseText, textElement, botMsgDiv);

        chatHistory.push({ role: "model", parts: [{ text: responseText }]});

    } catch (error){
        textElement.style.color ="#d62939";
        textElement.textContent = error.name === "AbortError" ? "Response generation stopped." : error.message;
        botMsgDiv.classList.remove("loading");
        document.body.classList.remove("bot-responding");   
    }
    finally{
        userData.file = {};
    }
}

// Continue response from where it was stopped
const continueResponse = async () => {
    if (!lastStoppedResponse) return;
    
    document.body.classList.add("bot-responding");
    document.body.classList.remove("response-stopped");
    
    // Create a new bot message div for continuation
    const botMsgHTML = `<img src="./images/gemini.svg" class="avatar"><p class="message-text">Continuing...</p>`;
    const botMsgDiv = createMsgElement(botMsgHTML, "bot-message", "loading");
    chatsContainer.appendChild(botMsgDiv);
    scrollToBottom();
    
    // Generate continuation response
    await generateResponse(botMsgDiv, true);
    lastStoppedResponse = null;
}

// handle the form submission
const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = promptInput.value.trim();
    if(!userMessage || document.body.classList.contains("bot-responding")) return;

    promptInput.value = "";
    userData.message = userMessage;
    document.body.classList.add("bot-responding", "chats-active");
    document.body.classList.remove("response-stopped");
    fileUploadWrapper.classList.remove("active", "img-attached", "file-attached");

// Generate user message HTML with optional file attachment
const userMsgHTML = `
    <p class="message-text"></p>
    ${userData.file.data ? (userData.file.isImage ? 
        `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="img-attachment" />` : 
        `<div class="file-attachment"><span class="material-symbols-rounded">description</span>${userData.file.fileName}</div>`) : ""}
    `;

const userMsgDiv = createMsgElement(userMsgHTML, "user-message");
userMsgDiv.querySelector(".message-text").textContent = userMessage;
chatsContainer.appendChild(userMsgDiv);
scrollToBottom();

setTimeout(() => {
    // Generate bot message HTML and add in the chats container after 600ms
    const botMsgHTML = `<img src="./images/gemini.svg" class="avatar"><p class="message-text">Just a sec...</p>`;
    const botMsgDiv = createMsgElement(botMsgHTML, "bot-message", "loading");
    chatsContainer.appendChild(botMsgDiv);
    scrollToBottom();
    generateResponse(botMsgDiv);
},600);
}

//Handle file input change (file upload)
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if(!file) return;

    const isImage = file.type.startsWith("image/");
    const reader = new FileReader();

    // For images, we need base64 encoding
    if (isImage) {
        reader.readAsDataURL(file);
    } else {
        // For other files, read as binary string
        reader.readAsBinaryString(file);
    }

    reader.onload = (e) => {
        fileInput.value = "";
        let base64String;
        
        if (isImage) {
            // For images, extract the base64 part after the comma
            base64String = e.target.result.split(",")[1];
            fileUploadWrapper.querySelector(".file-preview").src = e.target.result;
            fileUploadWrapper.classList.add("active", "img-attached");

        } else {
            // For other files, convert binary to base64
            base64String = btoa(e.target.result);
            fileUploadWrapper.classList.add("active", "file-attached");
        }
        // Store file data in userData object with proper mime type
        userData.file = {
            fileName: file.name,
            data: base64String,
            mime_type: file.type,
            isImage
        };
        
        console.log("File processed:", userData.file); // Debug log
    };

    reader.onerror = (error) => {
        console.error("Error reading file:", error);
        userData.file = {};
        fileUploadWrapper.classList.remove("active", "img-attached", "file-attached");
    };
});

//cancel file upload
document.querySelector("#cancel-file-btn").addEventListener("click", () => {
    userData.file = {};
    fileUploadWrapper.classList.remove("active", "img-attached", "file-attached");
});

//Stop ongoing bot response
document.querySelector("#stop-response-btn").addEventListener("click", () => {
    userData.file = {};
    controller?.abort();
    clearInterval(typingInterval);
    const loadingMsg = chatsContainer.querySelector(".bot-message.loading");
    if (loadingMsg) {
        loadingMsg.classList.remove("loading");
        // Store the stopped response for potential continuation
        lastStoppedResponse = {
            message: loadingMsg.querySelector(".message-text").textContent,
            timestamp: Date.now()
        };
    }
    document.body.classList.remove("bot-responding");
    document.body.classList.add("response-stopped");
});

// Continue response button
document.querySelector("#continue-response-btn").addEventListener("click", () => {
    continueResponse();
});

// Delete all chats
document.querySelector("#delete-chats-btn").addEventListener("click", () => {
    chatHistory.length = 0;
    chatsContainer.innerHTML = "";
    document.body.classList.remove("bot-responding", "chats-active", "response-stopped");
    lastStoppedResponse = null;
});

// Handle suggestion click
document.querySelectorAll(".suggestions-item").forEach(item => {
    item.addEventListener("click", () => {
        promptInput.value = item.querySelector(".text").textContent;
        promptForm.dispatchEvent(new Event("submit"));
    });
});

//show/hide controls for mobile or prompt input focus
document.addEventListener("click", (e) => {
    const target = e.target;
    const wrapper = document.querySelector(".prompt-wrapper");
    const shouldHide = target.classList.contains("prompt-input") || (wrapper.classList.contains("hide-controls") && (target.id === "add-file-btn" || target.id === "stop-response-btn" || target.id === "continue-response-btn"));
    wrapper.classList.toggle("hide-controls", shouldHide);
});

//Toggle dark/light theme
themeToggle.addEventListener("click", () => {
   const isLightTheme = document.body.classList.toggle("light-theme");
   localStorage.setItem("themeColor", isLightTheme ? "light_mode" : "dark_mode");
   themeToggle.textContent = isLightTheme ? "dark_mode" : "light_mode";
});

// Set Initial theme from local storage 
const isLightTheme = localStorage.getItem("themeColor") ===  "light_mode";
document.body.classList.toggle("light-theme", isLightTheme);
themeToggle.textContent = isLightTheme ? "dark_mode" : "light_mode";

promptForm.addEventListener("submit", handleFormSubmit);
promptForm.querySelector("#add-file-btn").addEventListener("click", () => fileInput.click());