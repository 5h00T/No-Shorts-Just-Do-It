const JUST_DO_IT_URL = "https://www.youtube.com/watch?v=ZXsQAXx_ao0";

chrome.webNavigation.onCommitted.addListener(
    redirectIfShorts,
    {
        url: [
            {
                hostEquals: "www.youtube.com",
                pathPrefix: "/shorts/",
            },
        ],
    }
);

chrome.webNavigation.onHistoryStateUpdated.addListener(
    redirectIfShorts,
    {
        url: [
            {
                hostEquals: "www.youtube.com",
                pathPrefix: "/shorts/",
            },
        ],
    }
);

function isYouTubeShorts(urlString) {
    try {
        const url = new URL(urlString);
        return (
            url.hostname === "www.youtube.com" &&
            url.pathname.startsWith("/shorts/")
        );
    } catch {
        return false;
    }
}

function redirectIfShorts(details) {
    // iframe内の遷移は無視
    if (details.frameId !== 0) {
        return;
    }

    if (!isYouTubeShorts(details.url)) {
        return;
    }

    chrome.tabs.update(details.tabId, {
        url: JUST_DO_IT_URL,
    });
}
