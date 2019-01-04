import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TripService} from "../../services/trip-service";
import {TripDetailPage} from "../trip-detail/trip-detail";

@Component({
  selector: 'historico',
  templateUrl: 'historico.html'
})
export class HistoricoPage {
  // list of trips
  public trips: any;

  constructor(public nav: NavController, public tripService: TripService) {
    // set sample data
    this.trips = tripService.getAll();
  }

  // view trip detail
  viewDetail(id) {
    this.nav.push(TripDetailPage, {id: id});
  }
}
