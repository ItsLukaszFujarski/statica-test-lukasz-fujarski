import {
    SciChartSurface,
    NumericAxis,
    DateTimeNumericAxis,
    NumberRange,
    XyDataSeries,
    EAxisAlignment,
    FastLineRenderableSeries, FastColumnRenderableSeries
} from "scichart";

export async function initSciChart(xValues, yValues, yValues2) {
    const {sciChartSurface, wasmContext} = await SciChartSurface.create("scichart-root");

    const minValue = Math.min(...xValues);
    const maxValue = Math.max(...xValues);

    const xAxis = new DateTimeNumericAxis(wasmContext, {
        axisTitle: "Data i godzina",
        visibleRange: new NumberRange(minValue, maxValue),
    });
    sciChartSurface.xAxes.add(xAxis);


    const yAxisPrice = new NumericAxis(wasmContext, {
        axisTitle: "Cena",
        id: "YAxis_1",
        axisAlignment: EAxisAlignment.Left,
    });
    const yAxisAmount = new NumericAxis(wasmContext, {
        axisTitle: "Ilość",
        axisAlignment: EAxisAlignment.Right,
        visibleRange: new NumberRange(Math.min(...yValues2), Math.max(...yValues2) * 2),
    });
    sciChartSurface.yAxes.add(yAxisPrice);
    sciChartSurface.yAxes.add(yAxisAmount);


    const dataSeriesPrice = new XyDataSeries(wasmContext, {
        xValues,
        yValues,
    });
    sciChartSurface.renderableSeries.add(new FastLineRenderableSeries(wasmContext, {
        dataSeries: dataSeriesPrice,
        strokeThickness: 1,
        stroke: "#50C7E0",
        yAxisId: yAxisPrice.id
    }));

    const dataSeriesAmount = new XyDataSeries(wasmContext, {
        xValues: xValues,
        yValues: yValues2,
    });

    sciChartSurface.renderableSeries.add(new FastColumnRenderableSeries(wasmContext, {
        dataSeries: dataSeriesAmount,
        strokeThickness: 1,
        stroke: "#fff",
    }));

    return sciChartSurface;
}
