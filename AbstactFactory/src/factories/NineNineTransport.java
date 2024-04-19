package factories;

import airceafts.Helicopter;
import airceafts.IAircraft;
import landvehicles.ILandVehicle;
import landvehicles.Motorcycle;

public class NineNineTransport  implements ITransportFactory{
    @java.lang.Override
    public ILandVehicle createTransportVehicle() {
        return new Motorcycle();
    }

    @java.lang.Override
    public IAircraft createTransportAircraft() {
        return new Helicopter();
    }
}
