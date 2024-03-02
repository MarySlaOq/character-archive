function loadContent(){

    // Load the logs
    const list = document.getElementById('log-list');
    const logList = Object.entries(data.logs).reverse();

    console.log(logList);

    logList.forEach(log => {

        const logObj = log[1];

        // Skip logs outside our concern filter
        if(logObj.concern != -1) return;
        
        const item = document.createElement('div');
        item.className = "box flex-simple";
        item.innerHTML = `
            <span class="tag">
                ${log[0]}
            </span>
            <span class="tag is-light">
                ${getCreator(logObj.trigger).name}
            </span>
            <span class="tag is-white">
                ${logObj.date}, ${logObj.time}
            </span>
            <span class="icon ${logIcons[logObj.operation][1]}">
              ${logIcons[logObj.operation][0]}
            </span>
            <p class="fit"> ${logObj.message} </p>

            <div class="tags has-addons">
                <span class="tag">Effects</span>
                <span class="tag ${logIcons[logObj.operation][1].replace("has-text", "is")}">${logObj.details}</span>
            </div>
        `;

        list.appendChild(item);
    });
}