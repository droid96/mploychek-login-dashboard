import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  Chart,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.html',
  styleUrl: './charts.css'
})
export class Charts implements OnChanges {

  @Input() users: any[] = [];

  @ViewChild('userChart')
  chartRef!: ElementRef;

  chart: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users'] && this.users.length > 0) {
      setTimeout(() => this.renderChart(), 100);
    }
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const isDark = document.body.classList.contains('dark-mode');
    const labelColor  = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';
    const borderColor = isDark ? '#0f1623' : '#ffffff';

    const adminCount = this.users.filter(u => u.role === 'Admin').length;
    const userCount  = this.users.filter(u => u.role === 'General User').length;

    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Admins', 'General Users'],
        datasets: [{
          data: [adminCount, userCount],
          backgroundColor: ['#ff6b00', '#2563eb'],
          hoverBackgroundColor: ['#ff8533', '#3b82f6'],
          borderColor: borderColor,
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        cutout: '72%',
        plugins: {
          legend: {
            display: false   // using our custom CSS legend
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const total = adminCount + userCount;
                const pct = total ? Math.round((ctx.parsed / total) * 100) : 0;
                return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  }
}
