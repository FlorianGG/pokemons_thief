$( document ).ready(function() {
  var body = $('body');
  var pokemonTr = body.find('table.tableaustandard.sortable tbody tr:not(:first)');
  var mainUrl = 'https://www.pokepedia.fr';
  var nbPokemons = pokemonTr.length;
  var miniatureOk = localStorage.getItem('miniature-ok') === null ? false : localStorage.getItem('miniature-ok');;
  var activePokemon = localStorage.getItem('active-pokemon') === null ? 0 : localStorage.getItem('active-pokemon');
  var activePokemonId = localStorage.getItem('active-pokemon-id') === null ? 0 : localStorage.getItem('active-pokemon-id');
  var listPokemon = localStorage.getItem('list-pokemon') === null ? {} : JSON.parse(localStorage.getItem('list-pokemon'));
  var listType = {
    'Acier' : 1,
    'Combat' : 2,
    'Dragon' : 3,
    'Eau' : 4,
    'Électrik' : 5,
    'Fée' : 6,
    'Feu' : 7,
    'Glace' : 8,
    'Insecte' : 9,
    'Normal' : 10,
    'Plante' : 11,
    'Poison' : 12,
    'Psy' : 13,
    'Roche' : 14,
    'Sol' : 15,
    'Spectre' : 16,
    'Ténèbres' : 17,
    'Vol' : 18
  }
  var listTalents = localStorage.getItem('list-talents') === null ? {} : JSON.parse(localStorage.getItem('list-talents'));
  console.log(window.location.href)
  if (window.location.href === mainUrl + '/Liste_des_Pok%C3%A9mon_dans_l%27ordre_du_Pok%C3%A9dex_National') {
    miniatureOk = true;
    if (!miniatureOk) {
      getMiniature();
    }else{
      getBackPokemonInfo();
    }
  }else if(window.location.href === mainUrl + '/Liste_des_talents_par_g%C3%A9n%C3%A9ration') {
    getBackTalents();
  }else{
    getBackPokemonFullInfo();
  }

  function getBackTalents(){
    var talents = {};
    var index = 1;
    pokemonTr.each(function(){
      var tds = $(this).find('td');
      if (tds.eq(0).find('a').text().trim().length > 0) {
        talents[tds.eq(0).find('a').text().trim()] = {
          'id' : index,
          'french_name' : tds.eq(0).find('a').text().trim(),
          'english_name' : tds.eq(1).text().trim(),
          'fight_effect' : tds.eq(2).text().trim(),
          'ground_effect' : tds.eq(3).text().trim()
        }
        index++;
      }
    })
    localStorage.setItem('list-talents', JSON.stringify(talents));
    activePokemon = 0;
    localStorage.setItem('active-pokemon', activePokemon);
    window.location.assign(mainUrl + '/Liste_des_Pok%C3%A9mon_dans_l%27ordre_du_Pok%C3%A9dex_National');
  }
  function getBackPokemonFullInfo(){
    if (typeof listPokemon[activePokemonId] !== 'undefined') {
      //on télécharge le cri et l'image
      getImageAndSound();
/*       $('.ficheinfo tr').each(function(){
        var tr = $(this);
        //on s'occupe des types
        if (tr.find('th a').text().trim() == 'Types') {
          var types = [];
          tr.find('td:first a').each(function(){
            types.push(listType[$(this).attr('title').replace(/\(type\)/, '').trim()])
          });
          listPokemon[activePokemonId].types = types;
        }
        //on s'occupe de la famille
        if (tr.find('th a').text().trim() == 'Famille') {
          tr.find('td:first').each(function(){
            listPokemon[activePokemonId].family = $(this).text().trim();
          });
        }
        //on s'occupe de la taille
        if (tr.find('th a').text().trim() == 'Taille') {
          tr.find('td:first').each(function(){
            var sizes = $(this).text().trim().match(/([0-9]\,[0-9])/g);
            if (sizes.length > 0) {
              listPokemon[activePokemonId].size = {
                'french_size' : parseFloat(sizes[0].replace(/\,/, '.')),
                'english_size' : parseFloat(sizes[1].replace(/\,/, '.'))
              }
            }
          });
        }
        //on s'occupe du poids
        if (tr.find('th a').text().trim() == 'Poids') {
          tr.find('td:first').each(function(){
            var weights = $(this).text().trim().match(/([0-9]\,[0-9])/g);
            if (weights.length > 0) {
              listPokemon[activePokemonId].weight = {
                'french_weight' : parseFloat(weights[0].replace(/\,/, '.')),
                'english_weight' : parseFloat(weights[1].replace(/\,/, '.'))
              }
            }
          });
        }
        //on s'occupe des talents
        if (tr.find('th a').text().trim() == 'Talents') {
          var talents = [];
          tr.find('td > a').each(function(){
            var talent = $(this).text().trim();
            talents.push(listTalents[talent].id);
          });
          listPokemon[activePokemonId].talents = talents;
        }
        //on s'occupe du sexe
        if (tr.find('th a').text().trim() == 'Sexe') {
          var sexe = {
            'female' : 0,
            'male' : 0,
            'asexual' : false
          };
          tr.find('td:first').each(function(){
            var sexeInfo = $(this).text().trim();
            if (sexeInfo == 'Asexué') {
              sexe.asexual = true;
            }else{
              var sexes = $(this).text().trim().match(/([0-9\,\.]+)\%/g);
              sexe = {
                'female' : parseFloat(sexes[0].replace(/\,/, '.')),
                'male' : parseFloat(sexes[1].replace(/\,/, '.'))
              };
            }
          });
          listPokemon[activePokemonId].sex = sexe;
        }
      });
      localStorage.setItem('list-pokemon', JSON.stringify(listPokemon));*/

      //go to the pokemons list page
      activePokemon++;
      localStorage.setItem('active-pokemon', activePokemon);
      window.location.assign(mainUrl + '/Liste_des_Pok%C3%A9mon_dans_l%27ordre_du_Pok%C3%A9dex_National');


    }
  }
  function getBackPokemonInfo(){
/*     if (activePokemon === false) {
      window.location.assign(mainUrl + '/Liste_des_talents_par_g%C3%A9n%C3%A9ration');
    } */
    if (activePokemon < nbPokemons) {
      if (typeof pokemonTr[activePokemon] !== 'undefined') {
        var tds = $(pokemonTr[activePokemon]).find('td');
        if (typeof tds.eq(0).html() !== 'undefined') {
          activePokemonId = tds.eq(0).html().trim();
          var pokemon = {
            'id': activePokemonId,
            'french_name': tds.eq(2).find('a').attr('title'),
            'english_name': tds.eq(3).find('a').attr('title').replace(/en\:/,''),
            'german_name' : tds.eq(4).find('a').attr('title').replace(/de\:/,'')
          }
          listPokemon[activePokemonId] = pokemon;
          //on set les infos dans le local storage
          localStorage.setItem('list-pokemon', JSON.stringify(listPokemon));
          localStorage.setItem('active-pokemon-id', activePokemonId);

          //go to the pokemon active page
          var missingPokemons = [80,170,188,191,194,205,225,277,281,284,286,359,381,413,439,464,469,482,497,513,527,554,563,567,585,626,634,659,665,702,706,709,715,725,733,738,750]
          console.log(missingPokemons.indexOf(activePokemonId), activePokemonId)
          if (missingPokemons.indexOf(parseInt(activePokemonId)) > -1) {
            window.location.assign(mainUrl + '/' + pokemon.french_name)
          }else{
            activePokemon++
            localStorage.setItem('active-pokemon', activePokemon);
            getBackPokemonInfo();
          }
        }else{
          activePokemon++
          localStorage.setItem('active-pokemon', activePokemon);
          getBackPokemonInfo();
        }
      }
    }
  }

  function getImageAndSound(){
    if (typeof listPokemon[activePokemonId] !== 'undefined') {
      //on télécharge le cri
      var url = $('.mediaContainer audio source').attr('src');
      var linkHtml = '<a download="' + activePokemonId + '" href="' + mainUrl + url + '">' + listPokemon[activePokemonId].french_name + '</a>';
      $('.ficheinfo').append(linkHtml);
      var link = document.querySelectorAll('.ficheinfo a[download]')[0];
      link.click();
      link.remove();
      //on télécharge l'image
      var linkHtml = '<a download="' + activePokemonId + '" href="' + mainUrl + $('.ficheinfo td.illustration img').attr('src') + '">' + listPokemon[activePokemonId].french_name + '</a>';
      $('.ficheinfo').append(linkHtml);
      var link = document.querySelectorAll('.ficheinfo a[download]')[0];
      link.click();
      link.remove();
    }
  }

  /**
   * Function in charge to get back the pokemon's miniatures
   */
  function getMiniature() {
    localStorage.setItem('miniature-ok', true)
    window.location.reload();
    var containerLinks = '<div class="containerLinks">';
    pokemonTr.each(function(){
      var tds = $(this).find('td');
      var id = tds.eq(0).text().trim();
      if (id.length > 0) {
        var url = mainUrl + tds.eq(1).find('img').attr('src');
        var name = tds.eq(2).find('a').attr('title');
        containerLinks += '<a download="mini_' + id + '" href="' + url + '">' + name + '</a>';

      }
    })
    containerLinks += '</div>';
    body.append(containerLinks);
    var links = document.querySelectorAll('.containerLinks a[download]');
    console.log(links)
    var limit = links.length;
    var init = 0;
    var t = 0;
    function clickLink() {
      if (init < limit) {
        links[init].click();
        init++;
        t = setTimeout(clickLink, 1000)
      }else{
          clearTimeout(t);
          body.find('.containerLinks').remove();
          localStorage.setItem('miniature-ok', true)
          window.location.reload()
      }
    }
    clickLink();
  }




});
