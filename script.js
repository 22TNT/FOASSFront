const form = document.querySelector('#inputForm');
let operations;

fetch('https://www.foaas.com/operations')
        .then(response => response.json())
        .then(data => operations = data)
        .then(() => {
            let newSelector = document.createElement('select');
            newSelector.id = "operations";
            newSelector.size=1;
            let defaultOption = document.createElement('option');
            defaultOption.disabled = true;
            defaultOption.text = "Select operation";
            newSelector.appendChild(defaultOption);
            for (const operation of operations){
                let newOption = document.createElement('option');
                newOption.value = operation.url;
                newOption.text = operation.name;
                newSelector.appendChild(newOption);
                form.appendChild(newSelector);
            }
            form.appendChild(document.createElement('br'));
            let selectButton = document.createElement('button');
            selectButton.type="submit";
            selectButton.textContent="Get a beautiful, scalable, nanoservice-based fuck off message";
            form.appendChild(selectButton);
        })
