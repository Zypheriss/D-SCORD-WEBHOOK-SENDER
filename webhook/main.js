function sendWebhook() {
    const webhookUrl = document.getElementById("link").value;
    const username = document.getElementById("username").value || "Liviuxs"; 
    const avatarUrl = document.getElementById("avatar").value || null; 
    const content = document.getElementById("content").value;

    
    if (!webhookUrl || !content) {
        showLog("Lütfen geçerli bir Webhook URL'si ve içerik girin!", "error");
        return;
    }

    const payload = {
        username: username,
        avatar_url: avatarUrl,
        content: content
    };

 
    fetch(webhookUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.ok) {
            showLog("Webhook başarıyla gönderildi!", "success");
        } else {
            showLog("Webhook gönderimi başarısız!", "error");
        }
    })
    .catch(error => {
        showLog("Hata oluştu: " + error.message, "error");
    });
}

function showLog(message, type) {
    const logElement = document.getElementById("log");
    logElement.innerText = message;
    
    // Clear any existing styles
    logElement.classList.remove("success", "error", "info");
    
    // Add the new type of message class
    logElement.classList.add(type);

    // Show the log bar
    logElement.style.display = "block";
    
    // Fade out after 5 seconds (if success)
    if (type === "success") {
        setTimeout(() => {
            logElement.style.opacity = 0;
            setTimeout(() => {
                logElement.style.display = "none"; // Hide it after fade
                logElement.style.opacity = 1; // Reset opacity
            }, 500);
        }, 3000);
    }
}
