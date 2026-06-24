@echo off
echo Melodix Player - GitHub Actions Monitor
echo =======================================
echo.
echo Usage:
echo   monitor              - View last build status
echo   monitor watch        - Watch every 2 minutes
echo   monitor token YOUR_TOKEN - Use GitHub token
echo.
if "%1"=="watch" goto watch
if "%1"=="token" set "TOKEN=%2" && goto watch

REM One-time check
powershell -ExecutionPolicy Bypass -Command "
`$Token = '%TOKEN%';
`$headers = @{ Accept = 'application/vnd.github.v3+json' };
if (`$Token) { `$headers.Authorization = 'token ' + `$Token };
try {
    `$runs = Invoke-RestMethod -Uri 'https://api.github.com/repos/jianbaobao/melodix-player/actions/runs?per_page=3' -Headers `$headers;
    `$run = `$runs.workflow_runs[0];
    Write-Host ('Latest Build: #' + `$run.id + ' ' + `$run.name);
    Write-Host ('Status: ' + `$run.status + ' | Conclusion: ' + `$run.conclusion);
    Write-Host ('Event: ' + `$run.event + ' | Updated: ' + `$run.updated_at);
    if (`$run.status -eq 'completed') {
        if (`$run.conclusion -eq 'success') { Write-Host 'RESULT: SUCCESS' -ForegroundColor Green }
        else { Write-Host 'RESULT: FAILED' -ForegroundColor Red }
    }
} catch { Write-Host 'Error: ' + `$_ }
"
goto :eof

:watch
echo Watching GitHub Actions every 2 minutes...
echo.
powershell -ExecutionPolicy Bypass -Command "
`$Token = '%TOKEN%';
`$headers = @{ Accept = 'application/vnd.github.v3+json' };
if (`$Token) { `$headers.Authorization = 'token ' + `$Token };
`$lastId = 0;
while (`$true) {
    try {
        `$runs = Invoke-RestMethod -Uri 'https://api.github.com/repos/jianbaobao/melodix-player/actions/runs?per_page=1' -Headers `$headers;
        `$run = `$runs.workflow_runs[0];
        `$time = Get-Date -Format 'HH:mm:ss';
        if (`$run.id -ne `$lastId) {
            `$lastId = `$run.id;
            `$icon = if (`$run.status -eq 'completed') { if (`$run.conclusion -eq 'success') { 'OK' } else { 'FAIL' } } else { '...' };
            Write-Host ('[' + `$time + '] #' + `$run.id + ' ' + `$run.name + ' => ' + `$run.status + ' ' + `$run.conclusion);
        }
    } catch { }
    Start-Sleep -Seconds 120;
}
" 2>&1
goto :eof