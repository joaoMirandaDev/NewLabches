package factories;

import airceafts.IAircraft;
import landvehicles.ILandVehicle;

public interface ITransportFactory {
    ILandVehicle createTransportVehicle();
    IAircraft createTransportAircraft();

}
