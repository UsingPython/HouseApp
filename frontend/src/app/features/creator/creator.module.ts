import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../../shared/shared.module';
import { CreatorRoutingModule } from './creator-routing.module';
import { CreatorComponent } from './pages/creator.component';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  declarations: [CreatorComponent, ResultsComponent],
  imports: [SharedModule, CreatorRoutingModule, TabsModule.forRoot()],
  providers: [CreatorComponent],
})
export class CreatorModule {}
