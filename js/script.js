$( document ).ready(function() {
  var body = $('body');
  var container = body.find("#pokedex-list");
  var tables = container.find('table');
  var list = [];
  var containerLinks = '<div class="containerLink">';

  //start the process
  loopPokemons();


  /**
   * Main function to browse all the pokemons
   */
  function loopPokemons(){
    tables.each(function(){
      var table = $(this);
      $(this).find('tr').each(function(){
        var tds = $(this).find('td');
        var pokemon = {
          'id': tds.eq(0).html(),
          'french_name': tds.eq(2).find('strong a').html(),
          'english_name': tds.eq(3).html(),
          'type' : []
        }
        pokemon.mini_url = 'http://www.pokemontrash.com/pokedex/' + tds.eq(1).find('img').attr('src');
        containerLinks += '<a download="mini_' + pokemon.id + '" href="' + pokemon.mini_url + '">' + pokemon.french_name + '</a>';


        // var types = $(this).children()[4].innerText.split('/');
        // for (var k = 0; k < types.length; k++) {
        //   pokemon.type.push(types[k].trim())
        // }
        // list.push(pokemon);
      })
    });
    containerLinks += '</div>';

    //get back the miniatures
    getMiniature();
  }

  /**
   * Function in charge to get back the pokemon's miniatures
   */
  function getMiniature() {
    body.append(containerLinks);
    var links = document.querySelectorAll('.containerLink a[download]');
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
      }
    }
    clickLink();
  }





});
