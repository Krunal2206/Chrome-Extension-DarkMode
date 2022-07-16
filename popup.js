if (document.querySelector('.popup')) {
    const button = document.querySelector('.button');
    const circle = document.querySelector('.circle');
    let buttonOn = false;

    button.addEventListener("click", async () => {
        if (!buttonOn) {
            buttonOn = true;
            button.style.animation = 'transformToBlue 1s ease-in-out 0s forwards';
            circle.style.animation = 'moveCircleRight 1s ease-in-out 0s forwards';
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: setPageBackgroundColorBlack,
            });
        } else {
            buttonOn = false;
            button.style.animation = 'transformToYellow 1s ease-in-out 0s forwards';
            circle.style.animation = 'moveCircleLeft 1s ease-in-out 0s forwards';
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: setPageBackgroundColorWhite,
            });
        }

    });

    function setPageBackgroundColorBlack() {
        chrome.storage.sync.get("color", ({ color }) => {
            document.body.style.backgroundColor = color;
            document.body.style.filter = "invert(2) hue-rotate(180deg)";
            let media = document.querySelectorAll("img, picture, video");
            media.forEach((mediaItem) => {
                mediaItem.style.filter = "invert(1) hue-rotate(180deg)"
            })
        });
    }

    function setPageBackgroundColorWhite() {
        document.body.style.backgroundColor = 'white';
        document.body.style.filter = "invert(0) hue-rotate(0deg)";
        let media = document.querySelectorAll("img, picture, video");
        media.forEach((mediaItem) => {
            mediaItem.style.filter = "invert(0) hue-rotate(0deg)"
        })
    }
}