
 
export class TodoModel {
  #todos = [];
  #listeners = [];

  add(title) {
    const clean = title.trim();
    if (!clean) throw new Error('Le titre est obligatoire');
    this.#todos.push({
      id: crypto.randomUUID(),
      title: clean,
      done: false
    });
    this.#notify();
  }

  toggle(id) {
    const todo = this.#todos.find(t => t.id === id);
    if (todo) {
      todo.done = !todo.done;
      this.#notify();
    }
  }

  remove(id) {
    this.#todos = this.#todos.filter(t => t.id !== id);
    this.#notify();
  }

  all() {
    return this.#todos.map(t => ({ ...t }));
  }

  // Filtre les tâches sans modifier la liste originale.
  filtrer(nom) {
    if (nom === 'toutes') {
      return this.all();
    }

    if (nom === 'faites') {
      return this.all().filter(t => t.done);
    }

    if (nom === 'a-faire') {
      return this.all().filter(t => !t.done);
    }

    throw new Error(`Filtre inconnu : ${nom}`);
  }

  // Compte les tâches qui ne sont pas terminées.
  restantes() {
    return this.#todos.filter(t => !t.done).length;
  }

  subscribe(fn) {
    this.#listeners.push(fn);
    fn(this.all());
  }

  #notify() {
    this.#listeners.forEach(fn => fn(this.all()));
  }
}
