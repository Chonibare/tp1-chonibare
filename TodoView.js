


export class TodoView {
  constructor(root) {
    this.form = root.querySelector('form');
    this.input = root.querySelector('input');
    this.list = root.querySelector('ul');
    this.counter = root.querySelector('.counter');
    this.error = root.querySelector('.error');
    this.filters = root.querySelectorAll('[data-filter]');
  }

  render(todos, restantes) {
    this.list.innerHTML = '';

    for (const t of todos) {
      const li = document.createElement('li');
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      const span = document.createElement('span');
      const button = document.createElement('button');

      checkbox.type = 'checkbox';
      checkbox.checked = t.done;
      checkbox.onchange = () => this.onToggle?.(t.id);

      span.textContent = t.title;

      if (t.done) {
        span.classList.add('done');
      }

      button.type = 'button';
      button.textContent = 'Supprimer';
      button.onclick = () => this.onRemove?.(t.id);

      label.append(checkbox, span);
      li.append(label, button);
      this.list.append(li);
    }

    this.counter.textContent = `${restantes} tâche(s) à faire`;
  }

  showError(msg) {
    this.error.textContent = msg;
  }

  bindAdd(handler) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      handler(this.input.value);
      this.input.value = '';
    });
  }

  bindToggle(handler) {
    this.onToggle = handler;
  }

  bindRemove(handler) {
    this.onRemove = handler;
  }

  bindFilter(handler) {
    this.filters.forEach(button => {
      button.addEventListener('click', () => {
        handler(button.dataset.filter);
      });
    });
  }

  showFiltre(nom) {
    this.filters.forEach(button => {
      button.disabled = button.dataset.filter === nom;
    });
  }
}
