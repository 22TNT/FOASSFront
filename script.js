const form = document.querySelector('#inputForm');
const lang = document.querySelector('#lang');
const shoutcloud = document.querySelector('#shoutcloud');
const output = document.getElementsByClassName("output")[0];

let fields = document.createElement('div');
let selectButton = document.createElement('button');
let opSelector = document.createElement('select');

let operations;

fetch('https://www.foaas.com/operations')
        .then(response => response.json())
        .then(data => operations = data)
        .then(() => {
            opSelector.id = "operations";
            opSelector.size=1;

            let defaultOption = document.createElement('option');
            defaultOption.selected = true;
            defaultOption.disabled = true;
            defaultOption.value = "default";
            defaultOption.text = "Select operation";
            opSelector.appendChild(defaultOption);

            for (const operation of operations){
                let newOption = document.createElement('option');
                newOption.value = operation.url;
                newOption.text = operation.name;
                opSelector.appendChild(newOption);
            }

            form.appendChild(opSelector);
            opSelector.addEventListener('change', handleSelectChange);
            form.appendChild(document.createElement('br'));

            selectButton.type="submit";
            selectButton.id="btnSubmit";
            selectButton.textContent="Get a beautiful, scalable, nanoservice-based fuck off message";

            form.appendChild(fields);
            form.appendChild(selectButton);
            form.addEventListener("submit", submit);
        })

function submit(event)
{
    if (event.preventDefault())
    {
        event.preventDefault();
    }

    if (opSelector.value === "default")
    {
        alert("Select the operation!");
        return false;
    }

    let url = 'https://www.foaas.com';
    url += opSelector.value;

    const children = Array.from(fields.children);

    children.forEach(node => {
        url = url.replace(":"+node.id, document.getElementById(node.id + "_input").value);
    });

    url += "?i18n="+lang.value;
    if (shoutcloud.checked)
    {
        url+="&shoutcloud";
    }

    let message;
    fetch(url, {
        method: "GET",
        headers: {
            'Accept': 'application/json'
        },
    }).then(response => response.json()).then(data => message = data).then(() => {
        let newDiv = document.createElement("div");
        let messageLabel = document.createElement("label");
        let subLabel = document.createElement("label");

        messageLabel.textContent = message.message;
        messageLabel.class = "content";
        subLabel.textContent = " -"+message.subtitle;
        subLabel.class = "subtitle";
        newDiv.class = "messages"

        newDiv.appendChild(messageLabel);
        newDiv.appendChild(subLabel);
        output.appendChild(newDiv);
    });

    return false;
}

function handleSelectChange(event)
{
    fields.innerHTML = "";
    let selectElement = event.target;

    let value = selectElement.value;
    for (const operation of operations)
    {
        if (operation.url === value)
        {
            for (const field of operation.fields)
            {
                let newLabel = document.createElement('label');
                newLabel.innerHTML = `
                    ${field.name}<input type="text" id="${field.field}_input" value="${field.name}"><br>`
                newLabel.id = field.field;
                fields.appendChild(newLabel);
            }
            break;
        }
    }
}