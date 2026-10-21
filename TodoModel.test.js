
// Le modèle se teste sans navigateur : il ne dépend pas du DOM.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TodoModel } from './TodoModel.js';

test('ajouter une tâche notifie les abonnés', () => {
  const model = new TodoModel();
  const snapshots = [];
  model.subscribe(todos => snapshots.push(todos));
  model.add('Lire le cours');

  assert.equal(snapshots.length, 2);
  assert.equal(snapshots[1][0].title, 'Lire le cours');
});

test('un titre vide est refusé', () => {
  assert.throws(() => new TodoModel().add('   '), /obligatoire/);
});

test('toggle inverse l’état done', () => {
  const model = new TodoModel();
  model.add('A');
  const [a] = model.all();

  model.toggle(a.id);

  assert.equal(model.all()[0].done, true);
});

test('le filtre toutes retourne toutes les tâches', () => {
  const model = new TodoModel();
  model.add('Tâche A');
  model.add('Tâche B');

  assert.equal(model.filtrer('toutes').length, 2);
});

test('les filtres faites et a-faire fonctionnent', () => {
  const model = new TodoModel();
  model.add('Terminée');
  model.add('En cours');

  const [terminee] = model.all();
  model.toggle(terminee.id);

  assert.equal(model.filtrer('faites').length, 1);
  assert.equal(model.filtrer('faites')[0].title, 'Terminée');
  assert.equal(model.filtrer('a-faire').length, 1);
  assert.equal(model.filtrer('a-faire')[0].title, 'En cours');
});

test('restantes compte les tâches non terminées', () => {
  const model = new TodoModel();
  model.add('Terminée');
  model.add('À faire');

  const [terminee] = model.all();
  model.toggle(terminee.id);

  assert.equal(model.restantes(), 1);
});

test('un filtre inconnu déclenche une erreur', () => {
  const model = new TodoModel();

  assert.throws(() => model.filtrer('inconnu'), /Filtre inconnu/);
});
