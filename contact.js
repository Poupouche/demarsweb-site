/* Demars Web — le seul script du site.
   Il affiche l'adresse de contact : elle n'est écrite en entier nulle part dans le site, pour la tenir à
   l'écart des robots qui ramassent les adresses. Le script la reconstitue à partir de morceaux et remplace
   chaque texte de secours (élément marqué data-contact) par un vrai lien « mailto: ».
   Sans script, le texte de secours reste lisible. Aucun cookie, aucune requête, rien d'autre. */
(function () {
  'use strict';

  var morceaux = ['contact', 'demarsweb', 'fr'];
  var adresse = morceaux[0] + String.fromCharCode(64) + morceaux[1] + '.' + morceaux[2];

  function afficher() {
    var cibles = document.querySelectorAll('[data-contact]');
    Array.prototype.forEach.call(cibles, function (cible) {
      var lien = document.createElement('a');
      var sujet = cible.getAttribute('data-sujet');
      lien.href = 'mailto:' + adresse + (sujet ? '?subject=' + encodeURIComponent(sujet) : '');
      lien.textContent = (cible.getAttribute('data-avant') || '') + adresse;
      if (cible.getAttribute('data-classe')) {
        lien.className = cible.getAttribute('data-classe');
      }
      while (cible.firstChild) {
        cible.removeChild(cible.firstChild);
      }
      cible.appendChild(lien);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afficher);
  } else {
    afficher();
  }
})();
