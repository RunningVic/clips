import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements OnInit, AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList();

  ngOnInit(): void {
    // console.log(this.tabs);
    // runs after component has been initialized.
  }

  ngAfterContentInit(): void {
    // runs after projected content has been initialized.
    const activeTabs = this.tabs?.filter(e => e.active === true);

    if (!activeTabs || activeTabs.length === 0) {
      this.selectedTab(this.tabs!.first);
    }
  }

  selectedTab(tab: TabComponent) {
    this.tabs?.forEach(tab => {
      tab.active = false;
    })

    tab.active = true;
    return false; // stop default behavior
  }
}
