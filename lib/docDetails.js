
export function createNewPage() {
    const pageUID = Date.now()
    const PageTemplate = {

        "id": pageUID,
        "title": "Untitled Page",
        "icon": "📄",
        "cover_image": "https://fffuel.co/images/dddepth-preview/dddepth-338.jpg",
        "content": [
            {
                "id": Math.floor(Math.random() * (Date.now())),
                "type": "h1",
                "text": "This is a Heading"
            },
            {
                "id": Math.floor(Math.random() * (Date.now())),
                "type": "h2",
                "text": "This is an Text 2."
            }, 
            {
                "id": Math.floor(Math.random() * (Date.now())),
                "type": "text",
                "text": "This is an Text 3."
            },

        ],
        "trashed": false,
        "created_at": Date.now(),
        "updated_at": Date.now()

    }
    localStorage.setItem('pages_' + pageUID, JSON.stringify(PageTemplate));
    return pageUID
}

export function getPageData(pageUID) {
    return JSON.parse(localStorage.getItem('pages_' + pageUID));
}



export function getPageBlocks(pageUID) {
    const page = JSON.parse(localStorage.getItem('pages_' + pageUID));
  
    return page.content
}


export function getAllPages() {
    const pages = Object.keys(localStorage)
        .filter(key => key.startsWith('pages_'))
        .map(key => JSON.parse(localStorage.getItem(key)));
    
    return pages;
}


