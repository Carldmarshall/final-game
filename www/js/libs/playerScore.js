import m from 'mithril';

// The area of the game UI that displays each player's current score
class Board {

  oninit(vnode) {
    this.game = vnode.attrs.game;
  }

  view() {
    return m('div#gameboard', this.game.players.map((player) => {
      return m('div.player-stats', { class: classNames(player.color) }, [
        m('div.player-name', player.name),
        m('div.player-score', player.score)
      ]);
    }));
    let divContainer = document.getElementById("playerScore");
            divContainer.innerHTML = "";
            divContainer.appendChild(score);

  }

}

export default Board;