let uploadedFile = [{}];
async function uploadFile (elm) {
    await new Response(elm.files[0]).json().then(file => uploadedFile = file);
}

document.getElementById('button').onclick = () => {
    let characterName = document.getElementById('name').value;
    console.log(characterName);

    for (macro of uploadedFile.macros) {
        macro.attributes.action = macro.attributes.action.replaceAll("selected", `${characterName}`);
        console.log(macro.attributes.action);
    }

    let changedMacros = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(uploadedFile));
    let a = document.createElement('a');
    a.href = 'data:' + changedMacros;
    a.download = `${characterName}_macros.json`;
    a.innerHTML = `Download macros of ${characterName}`;
    var container = document.getElementById('container');
    container.appendChild(a);
    a.click();
    a.remove();
}
