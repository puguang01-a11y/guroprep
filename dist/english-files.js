(() => {
  function update(input) {
    const text = input.nextElementSibling;
    if (text?.classList.contains('gp-file-name')) {
      text.textContent = input.files[0]?.name || 'No file selected';
    }
  }
  function enhance(root) {
    const files = root.matches?.('input[type=file]') ? [root] : root.querySelectorAll?.('input[type=file]') || [];
    for (const input of files) {
      if (input.parentElement.classList.contains('gp-file-picker')) continue;
      const wrapper = document.createElement('span');
      wrapper.className = 'gp-file-picker';
      const action = document.createElement('span');
      action.className = 'gp-file-action';
      action.textContent = 'Choose file';
      action.setAttribute('aria-hidden','true');
      const name = document.createElement('span');
      name.className = 'gp-file-name';
      name.setAttribute('aria-live','polite');
      input.before(wrapper);
      wrapper.append(action,input,name);
      input.title = 'Choose file';
      update(input);
      input.addEventListener('change',()=>update(input));
    }
  }
  enhance(document);
  new MutationObserver(records=>{
    for (const record of records) for (const node of record.addedNodes) {
      if (node.nodeType === 1) enhance(node);
    }
  }).observe(document.body,{childList:true,subtree:true});
  document.addEventListener('change',e=>{
    if(e.target.type==='file')setTimeout(()=>update(e.target),0);
  });
  document.addEventListener('reset',()=>setTimeout(()=>document.querySelectorAll('input[type=file]').forEach(update),0));
})();
