import { Injectable } from '@angular/core';

@Injectable()
export class  AppSettings {
    public endPointCore = '';
    public distancia;

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    getCurrentDay() {
        const today = new Date();
        let dd = today.getDate().toString();
        let mm = (today.getMonth() + 1).toString();
        const  yyyy = today.getFullYear().toString();
        if (parseInt(dd, 0) < 10) {
            dd = `0${dd}`;
        }

        if (parseInt(mm, 0) < 10) {
            mm = `0${mm}`;
        }
        return `${dd}/${mm}/${yyyy}`;
    }

    getCurrentHour() {
      const d = new Date();
      return `${this.addZero(d.getHours())}:${this.addZero(d.getMinutes())}:${this.addZero(d.getSeconds())}`;
    }

    addZero(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }

    private rad (x) {
      return x * Math.PI / 180;
    }

    obtenerDistancia(lon1, lat1, lon2, lat2, tipo= 'M') {
      const R = 6378.137; // Radio de la tierra en km
      lon1 = parseFloat(lon1);
      lon2 = parseFloat(lon2);
      lat1 = parseFloat(lat1);
      lat2 = parseFloat(lat2);

      const dLat = this.rad (lat2 - lat1);
      const dLong = this.rad(lon2 - lon1);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2))
                * Math.sin(dLong / 2) * Math.sin(dLong / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      switch (tipo) {
        case 'M':
          return d * 1000;
        case 'K':
          return d;
      }
    }
}
