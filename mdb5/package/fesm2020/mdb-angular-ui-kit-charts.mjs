import * as i0 from '@angular/core';
import { EventEmitter, Directive, Input, Output, NgModule } from '@angular/core';
import { merge } from 'lodash-es';
import { CommonModule } from '@angular/common';

class MdbChartDirective {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.chartClick = new EventEmitter();
        this.chartHover = new EventEmitter();
        this._defaultOptions = {
            line: {
                elements: {
                    line: {
                        backgroundColor: 'rgba(66, 133, 244, 0.0)',
                        borderColor: 'rgb(66, 133, 244)',
                        borderWidth: 2,
                        tension: 0.0,
                    },
                    point: {
                        borderColor: 'rgb(66, 133, 244)',
                        backgroundColor: 'rgb(66, 133, 244)',
                    },
                },
                responsive: true,
                plugins: {
                    tooltip: {
                        intersect: false,
                        mode: 'index',
                    },
                    legend: {
                        display: true,
                    },
                },
                scales: {
                    x: {
                        stacked: false,
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            color: 'rgba(0,0,0, 0.5)',
                        },
                    },
                    y: {
                        stacked: false,
                        grid: {
                            borderDash: [2],
                            drawBorder: false,
                            tickBorderDash: [2],
                            tickBorderDashOffset: [2],
                        },
                        ticks: {
                            color: 'rgba(0,0,0, 0.5)',
                        },
                    },
                },
            },
            bar: {
                elements: {
                    line: {
                        backgroundColor: 'rgb(66, 133, 244)',
                    },
                    bar: {
                        backgroundColor: 'rgb(66, 133, 244)',
                    },
                },
                responsive: true,
                plugins: {
                    tooltip: {
                        intersect: false,
                        mode: 'index',
                    },
                    legend: {
                        display: true,
                    },
                },
                scales: {
                    x: {
                        stacked: false,
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            color: 'rgba(0,0,0, 0.5)',
                        },
                    },
                    y: {
                        stacked: false,
                        grid: {
                            borderDash: [2],
                            drawBorder: false,
                            color: function (context) {
                                if (context.tick && context.tick.value === 0) {
                                    return 'rgba(0,0,0, 0)';
                                }
                                return Chart.defaults.borderColor;
                            },
                            tickBorderDash: [2],
                            tickBorderDashOffset: [2],
                        },
                        ticks: {
                            color: 'rgba(0,0,0, 0.5)',
                        },
                    },
                },
            },
            pie: {
                elements: {
                    arc: { backgroundColor: 'rgb(66, 133, 244)' },
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                },
            },
            doughnut: {
                elements: {
                    arc: { backgroundColor: 'rgb(66, 133, 244)' },
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                },
            },
            polarArea: {
                elements: {
                    arc: { backgroundColor: 'rgba(66, 133, 244, 0.5)' },
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                },
            },
            radar: {
                elements: {
                    line: {
                        backgroundColor: 'rgba(66, 133, 244, 0.5)',
                        borderColor: 'rgb(66, 133, 244)',
                        borderWidth: 2,
                    },
                    point: {
                        borderColor: 'rgb(66, 133, 244)',
                        backgroundColor: 'rgb(66, 133, 244)',
                    },
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                },
            },
            scatter: {
                elements: {
                    line: {
                        backgroundColor: 'rgba(66, 133, 244, 0.5)',
                        borderColor: 'rgb(66, 133, 244)',
                        borderWidth: 2,
                        tension: 0.0,
                    },
                    point: {
                        borderColor: 'rgb(66, 133, 244)',
                        backgroundColor: 'rgba(66, 133, 244, 0.5)',
                    },
                },
                responsive: true,
                plugins: {
                    tooltip: {
                        intersect: false,
                        mode: 'index',
                    },
                    legend: {
                        display: true,
                    },
                },
                datasets: {
                    borderColor: 'red',
                },
                scales: {
                    x: {
                        stacked: false,
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            color: 'rgba(0,0,0, 0.5)',
                        },
                    },
                    y: {
                        stacked: false,
                        grid: {
                            borderDash: [2],
                            drawBorder: false,
                            tickBorderDash: [2],
                            tickBorderDashOffset: [2],
                        },
                        ticks: {
                            color: 'rgba(0,0,0, 0.5)',
                        },
                    },
                },
            },
            bubble: {
                elements: {
                    point: {
                        borderColor: 'rgb(66, 133, 244)',
                        backgroundColor: 'rgba(66, 133, 244, 0.5)',
                    },
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false,
                        },
                        ticks: {
                            color: 'rgba(0,0,0, 0.5)',
                        },
                    },
                    y: {
                        grid: {
                            borderDash: [2],
                            drawBorder: false,
                            tickBorderDash: [2],
                            tickBorderDashOffset: [2],
                        },
                        ticks: {
                            color: 'rgba(0,0,0, 0.5)',
                        },
                    },
                },
            },
        };
        this._isInitialized = false;
    }
    get datasets() {
        return this._datasets;
    }
    set datasets(datasets) {
        this._datasets = datasets;
        if (this._chart && this._isInitialized) {
            this._chart.data.datasets = datasets;
            this.update();
        }
    }
    get labels() {
        return this._labels;
    }
    set labels(labels) {
        this._labels = labels;
        if (this._chart && this._isInitialized) {
            this._chart.data.labels = labels;
            this.update();
        }
    }
    get options() {
        return this._options;
    }
    set options(options) {
        this._options = options;
        if (this._isInitialized) {
            this._chart.options = options;
            this.rebuild();
        }
    }
    ngOnInit() {
        this._canvas = this._elementRef.nativeElement;
        this._ctx = this._canvas.getContext('2d');
        this._chart = this._buildChart(this._ctx);
        this._isInitialized = true;
    }
    ngOnDestroy() {
        this._destroyChart();
    }
    _destroyChart() {
        if (this._chart) {
            this._chart.destroy();
            this._chart = null;
        }
    }
    _buildChart(ctx) {
        const typeDefaultOptions = { ...this._defaultOptions[this.type] };
        const chartOptions = this.options
            ? merge(typeDefaultOptions, this.options)
            : typeDefaultOptions;
        if (!chartOptions.onHover) {
            chartOptions.onHover = (event, elements) => {
                this.chartHover.emit({ event, elements });
            };
        }
        if (!chartOptions.onClick) {
            chartOptions.onClick = (event, elements) => {
                this.chartClick.emit({ event, elements });
            };
        }
        let options;
        if (chartOptions.plugins && chartOptions.plugins.datalabels && ChartDataLabels) {
            options = {
                type: this.type,
                data: {
                    labels: this.labels,
                    datasets: this.datasets,
                },
                options: chartOptions,
                plugins: [ChartDataLabels],
            };
        }
        else {
            options = {
                type: this.type,
                data: {
                    labels: this.labels,
                    datasets: this.datasets,
                },
                options: chartOptions,
            };
        }
        return new Chart(ctx, options);
    }
    update() {
        if (this._chart) {
            this._chart.update();
        }
    }
    rebuild() {
        this._destroyChart();
        this._buildChart(this._ctx);
    }
}
MdbChartDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbChartDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbChartDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.7", type: MdbChartDirective, selector: "canvas[mdbChart]", inputs: { datasets: "datasets", labels: "labels", options: "options", type: "type" }, outputs: { chartClick: "chartClick", chartHover: "chartHover" }, exportAs: ["mdbChart"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbChartDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: 'canvas[mdbChart]',
                    exportAs: 'mdbChart',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { datasets: [{
                type: Input
            }], labels: [{
                type: Input
            }], options: [{
                type: Input
            }], type: [{
                type: Input
            }], chartClick: [{
                type: Output
            }], chartHover: [{
                type: Output
            }] } });

class MdbChartModule {
}
MdbChartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbChartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbChartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbChartModule, declarations: [MdbChartDirective], imports: [CommonModule], exports: [MdbChartDirective] });
MdbChartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbChartModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.7", ngImport: i0, type: MdbChartModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbChartDirective],
                    imports: [CommonModule],
                    exports: [MdbChartDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbChartDirective, MdbChartModule };
//# sourceMappingURL=mdb-angular-ui-kit-charts.mjs.map
