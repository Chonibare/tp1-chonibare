export class TodoViewModel {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.filtreActuel = 'toutes';

    this.model.subscribe(() => this.afficherTaches());

    this.view.bindAdd(titre => this.ajouterTache(titre));
    this.view.bindToggle(id => this.model.toggle(id));
    this.view.bindRemove(id => this.model.remove(id));
    this.view.bindFilter(filtre => this.changerFiltre(filtre));

    this.afficherTaches();
    this.view.showFiltre(this.filtreActuel);
  }

  ajouterTache(titre) {
    try {
      this.view.showError('');
      this.model.add(titre);
    } catch (erreur) {
      this.view.showError(erreur.message);
    }
  }

  changerFiltre(filtre) {
    this.filtreActuel = filtre;
    this.afficherTaches();
    this.view.showFiltre(filtre);
  }

  afficherTaches() {
    this.view.render(
      this.model.filtrer(this.filtreActuel),
      this.model.restantes()
    );
  }
}
