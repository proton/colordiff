const toggleClass = (element, className, toggle) => {
  if (toggle) element.classList.add(className)
  else element.classList.remove(className)
}

const highlite = (editor) => {
  const html = editor.innerHTML
  if (!html) return;

  const start = html.indexOf('<')
  if (start > 0) {
    const entry = html.substring(0, start)
    editor.innerHTML = `<pre>${entry}</pre>` + html.substring(start)
  } else if (start == -1) {
    editor.innerHTML = `<pre>${html}</pre>`
  }
  for (const child of editor.children) {
    const inner = child.innerHTML;
    toggleClass(child, 'hl-add', inner.match('^&gt; ') || inner.match('^\\\+'))
    toggleClass(child, 'hl-del', inner.match('^&lt; ') || inner.match('^\\\-'))
  }
}

const paste = (editor) => {
  editor.innerHTML = editor.innerText.split("\n").map(text => `<pre>${text}</pre>`).join("")
  highlite(editor)
}

const editor = document.getElementsByClassName('diff-editor')[0]
editor.addEventListener('input', _ => highlite(editor))
editor.addEventListener('paste', event => setTimeout(_ => paste(editor), 0))
highlite(editor)
