import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { merge } from 'lodash-es';
import * as i0 from "@angular/core";
export class MdbChartDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9jaGFydHMvY2hhcnRzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7O0FBVWxDLE1BQU0sT0FBTyxpQkFBaUI7SUFzUzVCLFlBQW9CLFdBQXVCO1FBQXZCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBelBqQyxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkQsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJELG9CQUFlLEdBQUc7WUFDeEIsSUFBSSxFQUFFO2dCQUNKLFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUU7d0JBQ0osZUFBZSxFQUFFLHlCQUF5Qjt3QkFDMUMsV0FBVyxFQUFFLG1CQUFtQjt3QkFDaEMsV0FBVyxFQUFFLENBQUM7d0JBQ2QsT0FBTyxFQUFFLEdBQUc7cUJBQ2I7b0JBQ0QsS0FBSyxFQUFFO3dCQUNMLFdBQVcsRUFBRSxtQkFBbUI7d0JBQ2hDLGVBQWUsRUFBRSxtQkFBbUI7cUJBQ3JDO2lCQUNGO2dCQUNELFVBQVUsRUFBRSxJQUFJO2dCQUNoQixPQUFPLEVBQUU7b0JBQ1AsT0FBTyxFQUFFO3dCQUNQLFNBQVMsRUFBRSxLQUFLO3dCQUNoQixJQUFJLEVBQUUsT0FBTztxQkFDZDtvQkFDRCxNQUFNLEVBQUU7d0JBQ04sT0FBTyxFQUFFLElBQUk7cUJBQ2Q7aUJBQ0Y7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLENBQUMsRUFBRTt3QkFDRCxPQUFPLEVBQUUsS0FBSzt3QkFDZCxJQUFJLEVBQUU7NEJBQ0osT0FBTyxFQUFFLEtBQUs7NEJB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ICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAnbG9kYXNoLWVzJztcblxuZGVjbGFyZSB2YXIgQ2hhcnQ6IGFueTtcbmRlY2xhcmUgdmFyIENoYXJ0RGF0YUxhYmVsczogYW55O1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdjYW52YXNbbWRiQ2hhcnRdJyxcbiAgZXhwb3J0QXM6ICdtZGJDaGFydCcsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkNoYXJ0RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBnZXQgZGF0YXNldHMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YXNldHM7XG4gIH1cbiAgc2V0IGRhdGFzZXRzKGRhdGFzZXRzOiBhbnkpIHtcbiAgICB0aGlzLl9kYXRhc2V0cyA9IGRhdGFzZXRzO1xuXG4gICAgaWYgKHRoaXMuX2NoYXJ0ICYmIHRoaXMuX2lzSW5pdGlhbGl6ZWQpIHtcbiAgICAgIHRoaXMuX2NoYXJ0LmRhdGEuZGF0YXNldHMgPSBkYXRhc2V0cztcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2RhdGFzZXRzOiBhbnlbXTtcblxuICBASW5wdXQoKVxuICBnZXQgbGFiZWxzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fbGFiZWxzO1xuICB9XG4gIHNldCBsYWJlbHMobGFiZWxzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2xhYmVscyA9IGxhYmVscztcblxuICAgIGlmICh0aGlzLl9jaGFydCAmJiB0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9jaGFydC5kYXRhLmxhYmVscyA9IGxhYmVscztcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2xhYmVsczogc3RyaW5nW107XG5cbiAgQElucHV0KClcbiAgZ2V0IG9wdGlvbnMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgfVxuICBzZXQgb3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcblxuICAgIGlmICh0aGlzLl9pc0luaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLl9jaGFydC5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgIHRoaXMucmVidWlsZCgpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9vcHRpb25zOiBhbnk7XG5cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBjaGFydENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNoYXJ0SG92ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgX2RlZmF1bHRPcHRpb25zID0ge1xuICAgIGxpbmU6IHtcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIGxpbmU6IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDY2LCAxMzMsIDI0NCwgMC4wKScsXG4gICAgICAgICAgYm9yZGVyQ29sb3I6ICdyZ2IoNjYsIDEzMywgMjQ0KScsXG4gICAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgdGVuc2lvbjogMC4wLFxuICAgICAgICB9LFxuICAgICAgICBwb2ludDoge1xuICAgICAgICAgIGJvcmRlckNvbG9yOiAncmdiKDY2LCAxMzMsIDI0NCknLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYig2NiwgMTMzLCAyNDQpJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgcGx1Z2luczoge1xuICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgaW50ZXJzZWN0OiBmYWxzZSxcbiAgICAgICAgICBtb2RlOiAnaW5kZXgnLFxuICAgICAgICB9LFxuICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHNjYWxlczoge1xuICAgICAgICB4OiB7XG4gICAgICAgICAgc3RhY2tlZDogZmFsc2UsXG4gICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgZGlzcGxheTogZmFsc2UsXG4gICAgICAgICAgICBkcmF3Qm9yZGVyOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjb2xvcjogJ3JnYmEoMCwwLDAsIDAuNSknLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHtcbiAgICAgICAgICBzdGFja2VkOiBmYWxzZSxcbiAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICBib3JkZXJEYXNoOiBbMl0sXG4gICAgICAgICAgICBkcmF3Qm9yZGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHRpY2tCb3JkZXJEYXNoOiBbMl0sXG4gICAgICAgICAgICB0aWNrQm9yZGVyRGFzaE9mZnNldDogWzJdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgIGNvbG9yOiAncmdiYSgwLDAsMCwgMC41KScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBiYXI6IHtcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIGxpbmU6IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2IoNjYsIDEzMywgMjQ0KScsXG4gICAgICAgIH0sXG4gICAgICAgIGJhcjoge1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYig2NiwgMTMzLCAyNDQpJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgcGx1Z2luczoge1xuICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgaW50ZXJzZWN0OiBmYWxzZSxcbiAgICAgICAgICBtb2RlOiAnaW5kZXgnLFxuICAgICAgICB9LFxuICAgICAgICBsZWdlbmQ6IHtcbiAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHNjYWxlczoge1xuICAgICAgICB4OiB7XG4gICAgICAgICAgc3RhY2tlZDogZmFsc2UsXG4gICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgZGlzcGxheTogZmFsc2UsXG4gICAgICAgICAgICBkcmF3Qm9yZGVyOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjb2xvcjogJ3JnYmEoMCwwLDAsIDAuNSknLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHtcbiAgICAgICAgICBzdGFja2VkOiBmYWxzZSxcbiAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICBib3JkZXJEYXNoOiBbMl0sXG4gICAgICAgICAgICBkcmF3Qm9yZGVyOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbG9yOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICAgICAgICBpZiAoY29udGV4dC50aWNrICYmIGNvbnRleHQudGljay52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAncmdiYSgwLDAsMCwgMCknO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBDaGFydC5kZWZhdWx0cy5ib3JkZXJDb2xvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aWNrQm9yZGVyRGFzaDogWzJdLFxuICAgICAgICAgICAgdGlja0JvcmRlckRhc2hPZmZzZXQ6IFsyXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjb2xvcjogJ3JnYmEoMCwwLDAsIDAuNSknLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGllOiB7XG4gICAgICBlbGVtZW50czoge1xuICAgICAgICBhcmM6IHsgYmFja2dyb3VuZENvbG9yOiAncmdiKDY2LCAxMzMsIDI0NCknIH0sXG4gICAgICB9LFxuICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBkb3VnaG51dDoge1xuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgYXJjOiB7IGJhY2tncm91bmRDb2xvcjogJ3JnYig2NiwgMTMzLCAyNDQpJyB9LFxuICAgICAgfSxcbiAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICBwbHVnaW5zOiB7XG4gICAgICAgIGxlZ2VuZDoge1xuICAgICAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcG9sYXJBcmVhOiB7XG4gICAgICBlbGVtZW50czoge1xuICAgICAgICBhcmM6IHsgYmFja2dyb3VuZENvbG9yOiAncmdiYSg2NiwgMTMzLCAyNDQsIDAuNSknIH0sXG4gICAgICB9LFxuICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByYWRhcjoge1xuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgbGluZToge1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoNjYsIDEzMywgMjQ0LCAwLjUpJyxcbiAgICAgICAgICBib3JkZXJDb2xvcjogJ3JnYig2NiwgMTMzLCAyNDQpJyxcbiAgICAgICAgICBib3JkZXJXaWR0aDogMixcbiAgICAgICAgfSxcbiAgICAgICAgcG9pbnQ6IHtcbiAgICAgICAgICBib3JkZXJDb2xvcjogJ3JnYig2NiwgMTMzLCAyNDQpJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2IoNjYsIDEzMywgMjQ0KScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzY2F0dGVyOiB7XG4gICAgICBlbGVtZW50czoge1xuICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSg2NiwgMTMzLCAyNDQsIDAuNSknLFxuICAgICAgICAgIGJvcmRlckNvbG9yOiAncmdiKDY2LCAxMzMsIDI0NCknLFxuICAgICAgICAgIGJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgIHRlbnNpb246IDAuMCxcbiAgICAgICAgfSxcbiAgICAgICAgcG9pbnQ6IHtcbiAgICAgICAgICBib3JkZXJDb2xvcjogJ3JnYig2NiwgMTMzLCAyNDQpJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDY2LCAxMzMsIDI0NCwgMC41KScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgIGludGVyc2VjdDogZmFsc2UsXG4gICAgICAgICAgbW9kZTogJ2luZGV4JyxcbiAgICAgICAgfSxcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBkYXRhc2V0czoge1xuICAgICAgICBib3JkZXJDb2xvcjogJ3JlZCcsXG4gICAgICB9LFxuICAgICAgc2NhbGVzOiB7XG4gICAgICAgIHg6IHtcbiAgICAgICAgICBzdGFja2VkOiBmYWxzZSxcbiAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGRyYXdCb3JkZXI6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGlja3M6IHtcbiAgICAgICAgICAgIGNvbG9yOiAncmdiYSgwLDAsMCwgMC41KScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgeToge1xuICAgICAgICAgIHN0YWNrZWQ6IGZhbHNlLFxuICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgIGJvcmRlckRhc2g6IFsyXSxcbiAgICAgICAgICAgIGRyYXdCb3JkZXI6IGZhbHNlLFxuICAgICAgICAgICAgdGlja0JvcmRlckRhc2g6IFsyXSxcbiAgICAgICAgICAgIHRpY2tCb3JkZXJEYXNoT2Zmc2V0OiBbMl0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDAsMCwwLCAwLjUpJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGJ1YmJsZToge1xuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgcG9pbnQ6IHtcbiAgICAgICAgICBib3JkZXJDb2xvcjogJ3JnYig2NiwgMTMzLCAyNDQpJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDY2LCAxMzMsIDI0NCwgMC41KScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBzY2FsZXM6IHtcbiAgICAgICAgeDoge1xuICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgZHJhd0JvcmRlcjogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aWNrczoge1xuICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDAsMCwwLCAwLjUpJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB5OiB7XG4gICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgYm9yZGVyRGFzaDogWzJdLFxuICAgICAgICAgICAgZHJhd0JvcmRlcjogZmFsc2UsXG4gICAgICAgICAgICB0aWNrQm9yZGVyRGFzaDogWzJdLFxuICAgICAgICAgICAgdGlja0JvcmRlckRhc2hPZmZzZXQ6IFsyXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBjb2xvcjogJ3JnYmEoMCwwLDAsIDAuNSknLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBfY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHByaXZhdGUgX2NoYXJ0OiBhbnk7XG5cbiAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY2FudmFzID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuX2N0eCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuX2NoYXJ0ID0gdGhpcy5fYnVpbGRDaGFydCh0aGlzLl9jdHgpO1xuXG4gICAgdGhpcy5faXNJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95Q2hhcnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rlc3Ryb3lDaGFydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2hhcnQpIHtcbiAgICAgIHRoaXMuX2NoYXJ0LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX2NoYXJ0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9idWlsZENoYXJ0KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogYW55IHtcbiAgICBjb25zdCB0eXBlRGVmYXVsdE9wdGlvbnMgPSB7IC4uLnRoaXMuX2RlZmF1bHRPcHRpb25zW3RoaXMudHlwZV0gfTtcbiAgICBjb25zdCBjaGFydE9wdGlvbnMgPSB0aGlzLm9wdGlvbnNcbiAgICAgID8gbWVyZ2UodHlwZURlZmF1bHRPcHRpb25zLCB0aGlzLm9wdGlvbnMpXG4gICAgICA6IHR5cGVEZWZhdWx0T3B0aW9ucztcblxuICAgIGlmICghY2hhcnRPcHRpb25zLm9uSG92ZXIpIHtcbiAgICAgIGNoYXJ0T3B0aW9ucy5vbkhvdmVyID0gKGV2ZW50OiBhbnksIGVsZW1lbnRzOiBhbnlbXSkgPT4ge1xuICAgICAgICB0aGlzLmNoYXJ0SG92ZXIuZW1pdCh7IGV2ZW50LCBlbGVtZW50cyB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCFjaGFydE9wdGlvbnMub25DbGljaykge1xuICAgICAgY2hhcnRPcHRpb25zLm9uQ2xpY2sgPSAoZXZlbnQ6IGFueSwgZWxlbWVudHM6IGFueVtdKSA9PiB7XG4gICAgICAgIHRoaXMuY2hhcnRDbGljay5lbWl0KHsgZXZlbnQsIGVsZW1lbnRzIH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBsZXQgb3B0aW9uczogYW55O1xuXG4gICAgaWYgKGNoYXJ0T3B0aW9ucy5wbHVnaW5zICYmIGNoYXJ0T3B0aW9ucy5wbHVnaW5zLmRhdGFsYWJlbHMgJiYgQ2hhcnREYXRhTGFiZWxzKSB7XG4gICAgICBvcHRpb25zID0ge1xuICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBsYWJlbHM6IHRoaXMubGFiZWxzLFxuICAgICAgICAgIGRhdGFzZXRzOiB0aGlzLmRhdGFzZXRzLFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zOiBjaGFydE9wdGlvbnMsXG4gICAgICAgIHBsdWdpbnM6IFtDaGFydERhdGFMYWJlbHNdLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgbGFiZWxzOiB0aGlzLmxhYmVscyxcbiAgICAgICAgICBkYXRhc2V0czogdGhpcy5kYXRhc2V0cyxcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uczogY2hhcnRPcHRpb25zLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENoYXJ0KGN0eCwgb3B0aW9ucyk7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0KSB7XG4gICAgICB0aGlzLl9jaGFydC51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICByZWJ1aWxkKCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3lDaGFydCgpO1xuICAgIHRoaXMuX2J1aWxkQ2hhcnQodGhpcy5fY3R4KTtcbiAgfVxufVxuIl19