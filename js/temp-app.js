(function(global, local) {

    // onpage load, hide the card!
    // document.getElementById("card").style.display = "none";

    // helper functions
    const getById = function(id) {
        return local.getElementById(id)
    } 
    
    const copyToClipboard = function (text) {
        if (window.clipboardData && window.clipboardData.setData) {
            // IE specific code path to prevent textarea being shown while dialog is visible.
            return clipboardData.setData("Text", text); 

        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            const textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }
    
    // necessary variable declarations
    const lolz = getById("lolz");
    const formo = getById("formo");
    const copy = getById("copy-snippet");
    const baseUrl = global.location.href;

    
    // on page load, focus on input element
    lolz.focus();
    
    //listen for a submit event and hijack the process
    formo.addEventListener("submit", e=> {
        e.preventDefault();
        const loc = `${global.location.href}#create=${lolz.value}`;
        global.location.reload(true);
        
        console.log(loc);
        window.location.href = loc;

    })

    // onclick copy text to clipboard
    copy.addEventListener("click", function(e) {
        const snippet = document.querySelector("code").innerText;
        // alert(snippet)
        copyToClipboard(snippet);
        
        copy.innerText = "copied!"
        
        setTimeout(function(){
            copy.innerHTML = 'copy! <i class="fa fa-copy"></i>';
        }, 2000)
    })

    global.getById = getById;
    global.baseUrl = baseUrl;
    
})(window, document)