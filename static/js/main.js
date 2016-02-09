
function updateForm() {
      var filename = document.getElementById('file').value;
      var name = document.getElementById('name');
      var suggestion = filename.replace(/^.*[\\\/]/, ''); 
      suggestion = suggestion.replace(/\..*$/, '');
      suggestion = suggestion.charAt(0).toUpperCase() + suggestion.slice(1);
      name.value = suggestion;
}

function updateVisible() {
      var visible = document.getElementById('visible').checked;

      var name = document.getElementById('name');
      name.disabled = !visible;
      var name = document.getElementById('comment');
      comment.disabled = !visible;
      var name = document.getElementById('sender');
      sender.disabled = !visible;
      var name = document.getElementById('modkey');
      modkey.disabled = !visible;



}
