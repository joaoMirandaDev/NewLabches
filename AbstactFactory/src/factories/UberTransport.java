package factories;

import airceafts.Airplane;
import airceafts.IAircraft;
import landvehicles.Car;
import landvehicles.ILandVehicle;

public class UberTransport implements  ITransportFactory{
    Override
    public ILandVehicle createTransportVehicle() {
        return new Car();
    }

    Override
    public IAircraft createTransportAircraft() {
        return new Airplane();
    }
}
