(function main() {
  const root = document.getElementById('root');
  const pseudoModal = document.createElement('h1');
  const a = document.createElement('a');

  function poll(timestamp, salt) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/poll?timestamp=' + timestamp + '&salt=' + salt);

    xhr.onload = function pollResolver() {
      if (xhr.status === 200 && xhr.readyState === 4) {
        pseudoModal.innerHTML = a.download + ' Загружен!!!';
        setTimeout(function renderMessage() {
          pseudoModal.innerHTML = '';
        }, 2000);
      } else if (xhr.status === 204 && xhr.readyState === 4) {
        poll(timestamp, salt);
      }
    };
    xhr.send();
  }

  function onDownloadRequest(e) {
    const timestamp = Date.now();
    e.preventDefault();
    const file = e.target.href;
    const salt = Math.random() * 1000;
    const name = e.target.download;
    const dlc = document.createElement('a');
    dlc.href = file + '?timestamp=' + timestamp + '&salt=' + salt;
    dlc.download = name;
    dlc.click();

    poll(timestamp, salt);

  }

  a.href = '/downloads/file.dmz';
  a.download = 'file.dmz';
  a.innerText = 'Нажмите что бы скачать!';

  a.addEventListener('click', onDownloadRequest);

  root.appendChild(a);
  root.appendChild(pseudoModal);
})();
