
export function renamePageTitle(pageUID, newTitle) {
    const currentPageData = JSON.parse(localStorage.getItem('pages_' + pageUID))
    currentPageData.title = newTitle;
    currentPageData.updated_at = Date.now()
    console.log(currentPageData)
    localStorage.setItem('pages_' + pageUID, JSON.stringify(currentPageData));
}

export function updateTrashStatus(pageUID, newStatus) {
    const currentPageData = JSON.parse(localStorage.getItem('pages_' + pageUID))
    currentPageData.trashed = newStatus;
    
    localStorage.setItem('pages_' + pageUID, JSON.stringify(currentPageData));
}
export function renamePageIcon(pageUID, newIcon) {
    const currentPageData = JSON.parse(localStorage.getItem('pages_' + pageUID))
    currentPageData.icon = newIcon;
    currentPageData.updated_at = Date.now()
    console.log(currentPageData)
    localStorage.setItem('pages_' + pageUID, JSON.stringify(currentPageData));
}
export function changeCover(pageUID, newLink) {
    const currentPageData = JSON.parse(localStorage.getItem('pages_' + pageUID))
    currentPageData.cover_image = newLink;
    currentPageData.updated_at = Date.now()
    localStorage.setItem('pages_' + pageUID, JSON.stringify(currentPageData));
}

export function reorderPageContent(pageUID, newContent) {
    const currentPageData = JSON.parse(localStorage.getItem('pages_' + pageUID))
    currentPageData.content = newContent;
    currentPageData.updated_at = Date.now()
    localStorage.setItem('pages_' + pageUID, JSON.stringify(currentPageData));
}


export function updateText(pageUID, blockId, newText) {
    
    const currentPageData = JSON.parse(localStorage.getItem('pages_' + pageUID))
    const oldContent = currentPageData.content
    
    const index = oldContent.findIndex(item => item.id === blockId);
    const block = oldContent[index]
    block.text = newText
    oldContent[index] = block
    currentPageData.content = oldContent
    currentPageData.updated_at = Date.now()
    localStorage.setItem('pages_' + pageUID, JSON.stringify(currentPageData));
}

export function updateType(pageUID, blockId, newType) {
    
    const currentPageData = JSON.parse(localStorage.getItem('pages_' + pageUID))
    const oldContent = currentPageData.content
    
    const index = oldContent.findIndex(item => item.id === blockId);
    const block = oldContent[index]
    block.type = newType
    oldContent[index] = block
    currentPageData.content = oldContent
    currentPageData.updated_at = Date.now()
    localStorage.setItem('pages_' + pageUID, JSON.stringify(currentPageData));
}

export function addBlock(pageUID, blockId) {
    
    const currentPageData = JSON.parse(localStorage.getItem('pages_' + pageUID))
    const oldContent = currentPageData.content
    
    const index = oldContent.findIndex(item => item.id === blockId);
    const elementToAdd = {
        "id": Math.floor(Math.random() * (Date.now())),
        "type": "text",
        "text": ""
    }
    oldContent.splice(index + 1, 0, elementToAdd)
    console.log( oldContent[index + 1].id)
    

    currentPageData.content = oldContent
    currentPageData.updated_at = Date.now()
    
    localStorage.setItem('pages_' + pageUID, JSON.stringify(currentPageData));
    return oldContent[index + 1].id
}

export function duplicateBlock(pageUID, blockId) {
    
    const currentPageData = JSON.parse(localStorage.getItem('pages_' + pageUID))
    const oldContent = currentPageData.content
    
    const index = oldContent.findIndex(item => item.id === blockId);
    const elementToAdd = oldContent[index]
    oldContent.splice(index + 1, 0, elementToAdd)
    
    currentPageData.content = oldContent
    currentPageData.updated_at = Date.now()
    console.log(currentPageData)
    localStorage.setItem('pages_' + pageUID, JSON.stringify(currentPageData));
}

export function deleteBlock(pageUID, blockId) {
    
    const currentPageData = JSON.parse(localStorage.getItem('pages_' + pageUID))
    const oldContent = currentPageData.content
    
    const index = oldContent.findIndex(item => item.id === blockId);
    
    oldContent.splice(index, 1)
    
    currentPageData.content = oldContent
    currentPageData.updated_at = Date.now()
    console.log(currentPageData)
    localStorage.setItem('pages_' + pageUID, JSON.stringify(currentPageData));
}

export function addNewBlock(pageUID) {
    
    const currentPageData = JSON.parse(localStorage.getItem('pages_' + pageUID))
    const oldContent = currentPageData.content
    
    const elementToAdd = {
        "id": Math.floor(Math.random() * (Date.now())),
        "type": "text",
        "text": ""
    }
    
    oldContent.push(elementToAdd)

    currentPageData.content = oldContent
    currentPageData.updated_at = Date.now()
    console.log(currentPageData)
    localStorage.setItem('pages_' + pageUID, JSON.stringify(currentPageData));
}

