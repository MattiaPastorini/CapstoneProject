package mattiapastorini.CapStone_FantaF1.Payloads;

public class UpdatePointsRequest {
    private Integer puntiTotali;
    private Integer bonusMalus;

    public UpdatePointsRequest() {
    } // costruttore vuoto importante!

    public Integer getPuntiTotali() {
        return puntiTotali;
    }

    public Integer getBonusMalus() {
        return bonusMalus;
    }

    public void setPuntiTotali(Integer p) {
        this.puntiTotali = p;
    }

    public void setBonusMalus(Integer b) {
        this.bonusMalus = b;
    }
}
