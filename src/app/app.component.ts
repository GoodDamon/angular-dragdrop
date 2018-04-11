import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    dragstart(i:any, event:any) {
        console.log('dragstart');
        if (event.target.className === 'sortable-item') {
            event.dataTransfer.setData('text/plain', null);
            this.myItems[+i].moving = true;
        }
    }

    dragend(i:any, event:any) {
        console.log('dragend');
        if (event.target.className === 'sortable-item') {
            this.myItems[+i].moving = false;
        }
    }

    dragover(event:any) {
        console.log('dragover');
        event.preventDefault();
    }

    dragenter(i:any, event:any) {
        console.log('dragenter');
        if (event.target.className === 'sortable-item-background') {
            this.hovering = +i;
        }
    }

    dragleave(event:any) {
        console.log('dragleave');
        if ( event.target.className == 'sortable-item-background' ) {
            this.hovering = -1;
        }
    }

    drop(i:any, event:any) {
        console.log('drop');
        event.preventDefault();
        if ( event.target.className == 'sortable-item-background' ) {
            console.log(event);
        }

        let old_item = this.myItems.find(item => item.moving);
        let old_index = this.myItems.findIndex(item => item.moving);
        let new_index = +i;

        old_item.moving = false;
        this.hovering = -1;

        if (new_index >= this.myItems.length) {
            let k = new_index - this.myItems.length + 1;
            while (k--) {
                this.myItems.push(undefined);
            }
        }

        this.myItems.splice(new_index, 0, this.myItems.splice(old_index, 1)[0]);

    }

    add() {
        this.myItems.push({name: `Item #${this.count}`, moving: false});
        this.count++;
    }

    count = 1;
    hovering:number;

    myItems = [
        {name: 'Apple', moving: false},
        {name: 'Banana', moving: false},
        {name: 'Mushroom', moving: false},
        {name: 'Monkey', moving: false}
    ];

}
