import {Component} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {Player, FieldPosition} from './models/common.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [CdkDropList, CdkDrag, NgForOf, NgIf],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less'
})
export class AppComponent {
    players: Player[] = [
        {id: 1, name: 'Leo', surname: 'Messi', number: 10, photo: 'assets/messi.jpg', position: null},
        {id: 2, name: 'Aleksandr', surname: 'Kostylev', number: 12, photo: 'assets/s1mple.jpg', position: null},
        {id: 3, name: 'Donk', surname: 'Daniil', number: 15, photo: 'assets/donk.jpg', position: null},
    ];

    positions: FieldPosition[] = [
        {id: 'gk', x: 100, y: 50, player: null},
        {id: 'def1', x: 250, y: 400, player: null},
        {id: 'def3', x: 500, y: 200, player: null},
    ];

    get positionIds(): string[] {
        return this.positions.map(p => p.id);
    }

    returnPlayerToList(player: Player) {
        player.position = null;
        this.players.push(player);
    }

    onDrop(event: CdkDragDrop<any>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            const player: Player = event.item.data;
            const prevContainer = event.previousContainer;
            const newContainer = event.container;

            if (prevContainer.id === 'playersList') {
                const newPosition = newContainer.data as FieldPosition;
                if (newPosition.player) {
                    this.returnPlayerToList(newPosition.player);
                }
                newPosition.player = player;
                player.position = newPosition.id;
                this.players = this.players.filter(p => p.id !== player.id);
            } else if (newContainer.id === 'playersList') {
                this.returnPlayerToList(player);
                const oldPosition = prevContainer.data as FieldPosition;
                oldPosition.player = null;
            } else {
                const oldPosition = prevContainer.data as FieldPosition;
                const newPosition = newContainer.data as FieldPosition;
                const oldPlayerInNewPosition = newPosition.player;

                if (oldPlayerInNewPosition) {
                    oldPosition.player = oldPlayerInNewPosition;
                    oldPlayerInNewPosition.position = oldPosition.id;
                } else {
                    oldPosition.player = null;
                }

                newPosition.player = player;
                player.position = newPosition.id;
            }
        }
    }

    get connectedLists(): string[] {
        return ['playersList', ...this.positionIds];
    }
}
