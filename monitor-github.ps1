# Melodix Player - GitHub Actions Monitor
# 使用方法: .\monitor-github.ps1 -Token "你的GitHubToken" -Owner "你的用户名" -Repo "melodix-player"
# 如果没有Token也可以只查看公开状态

param(
    [string]$Token = "",
    [string]$Owner = "jianbaobao",
    [string]$Repo = "melodix-player",
    [int]$IntervalSeconds = 120
)

$api = "https://api.github.com/repos/$Owner/$Repo"
$headers = @{ Accept = "application/vnd.github.v3+json" }
if ($Token) { $headers.Authorization = "token $Token" }

Write-Host "=== GitHub Actions Monitor ==="
Write-Host "Repo: $Owner/$Repo"
Write-Host "Check interval: $IntervalSeconds seconds"
Write-Host "Press Ctrl+C to stop`n"

$lastId = 0
while ($true) {
    try {
        $runs = Invoke-RestMethod -Uri "$api/actions/runs?per_page=3" -Headers $headers
        $run = $runs.workflow_runs[0]
        $time = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        
        if ($run.id -ne $lastId) {
            $lastId = $run.id
            $statusSymbol = switch ($run.status) {
                "in_progress" { "▶" }
                "queued" { "⏸" }
                "completed" { if ($run.conclusion -eq "success") { "✅" } else { "❌" } }
                default { "?" }
            }
            Write-Host "$statusSymbol [$time] #$($run.id) $($run.name)"
            Write-Host "   Status: $($run.status)"
            
            if ($run.status -eq "completed") {
                Write-Host "   Conclusion: $($run.conclusion)"
                Write-Host "   Event: $($run.event)"
                Write-Host "   Created: $($run.created_at)"
                Write-Host "   Duration: $(([DateTime]$run.updated_at - [DateTime]$run.created_at).TotalSeconds)s"
                
                # Show step details
                try {
                    $jobs = Invoke-RestMethod -Uri "$api/actions/runs/$($run.id)/jobs" -Headers $headers
                    foreach ($job in $jobs.jobs) {
                        foreach ($step in $job.steps) {
                            $icon = if ($step.conclusion -eq "success") { "  ok" } elseif ($step.conclusion -eq "failure") { "  XX" } else { "  --" }
                            Write-Host "$icon $($step.name): $($step.conclusion)"
                        }
                    }
                } catch { }
                Write-Host ""
            }
        }
    } catch {
        $time = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        Write-Host "[$time] Error: $($_.Exception.Message)"
    }
    
    Start-Sleep -Seconds $IntervalSeconds
}