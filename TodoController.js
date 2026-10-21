
export class TodoController {
  #filtre = 'toutes';

  constructor(model, view) {
    view.bindAdd(title => {
      try {
        model.add(title);
        view.showError('');
      } catch (error) {
        view.showError(error.message);
      }
    });

    view.bindToggle(id => model.toggle(id));
    view.bindRemove(id => model.remove(id));

    view.bindFilter(nom => {
      try {
        model.filtrer(nom);
        this.#filtre = nom;
        view.showError('');
        this.#afficher(model, view);
      } catch (error) {
        view.showError(error.message);
      }
    });

    model.subscribe(() => this.#afficher(model, view));
  }

  #afficher(model, view) {
    view.showFiltre(this.#filtre);
    view.render(
      model.filtrer(this.#filtre),
      model.restantes()
    );
  }
}
