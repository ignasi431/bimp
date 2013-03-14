 //-------------- funciones Spin Wheel-------------------------/
          function abrirSpinWheel(id_indice){
        	  backKeyAction='cerrar_spinwheel';
              var filtro=oFiltros.filtros[id_indice];
              var keyEdadSelecionada=filtro.seleccionadas[0];
              var keyRelevanciaSelecionada=filtro.relevancia;
              indice_ruleta=id_indice;
              filtroRuleta=filtro;
              
              
              
              SpinningWheel.addSlot(filtro.opciones, '50percent',keyEdadSelecionada);	
              SpinningWheel.addSlot(filtro.relevancias, '50percent',keyRelevanciaSelecionada);
              SpinningWheel.setCancelAction(cancel);
              SpinningWheel.setDoneAction(done);	    
              SpinningWheel.open();
              $("#sw-cancel").html(filtro.texto_botones[1]);
              $("#sw-done").html(filtro.texto_botones[0]);
          }
          function done() {
        	  backKeyAction='back';
              var results = SpinningWheel.getSelectedValues();	
              setRelevancia(indice_ruleta,results.keys[1],true);
              filtroRuleta.seleccionadas[0]=results.keys[0];
              guardaAccion('done_ruleta_filtro_'+indice_ruleta+'_opcion_'+results.keys[0],'bred.html');
              updateLista();
              /*	alert('cosas');
               alert(results.keys[0]);
               alert(results.values.value[0]);*/
              $('table #boton_'+indice_ruleta).css('background-image','url('+c_path['botones']+filtroRuleta.botones[results.keys[1]]+')');
              $(".opacidad").hide();
          }
          function cancel() {
              guardaAccion('cancelar_ruleta_'+indice_ruleta,'bred.html');
        	  backKeyAction='back';
              $(".opacidad").hide();
          }
          window.addEventListener('load', function(){ setTimeout(function(){ 
                                                                 
                                                                 window.scrollTo(0,0); }, 100); }, true);
          
          //-------------- fin funciones Spin Wheel-------------------------/
          