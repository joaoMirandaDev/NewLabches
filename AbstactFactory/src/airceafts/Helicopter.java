package airceafts;

public class Helicopter implements IAircraft{
    @java.lang.Override
    public void startRoute() {
        wind();
        getCargo();
        System.out.println("Iniciando a decolagem");
    }

    @java.lang.Override
    public void getCargo() {
        System.out.println("Passageiros ok, ligando hélices");
    }

    @java.lang.Override
    public void wind() {
        System.out.println("Ventos ok!");
    }
}
