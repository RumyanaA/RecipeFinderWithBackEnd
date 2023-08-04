package RecipeFinder.ExternalApiClasses;

public class Measures {
    private MeasureMetric metric;
    private MeasureUS us;

    public MeasureMetric getMetric() {
        return metric;
    }

    public void setMetric(MeasureMetric metric) {
        this.metric = metric;
    }

    public MeasureUS getUs() {
        return us;
    }

    public void setUs(MeasureUS us) {
        this.us = us;
    }
}
