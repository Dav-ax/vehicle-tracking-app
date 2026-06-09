# Descargar instalador de Node.js LTS
$nodeInstaller = "https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi"
$downloadPath = "$env:TEMP\nodejs.msi"

Invoke-WebRequest -Uri $nodeInstaller -OutFile $downloadPath

# Instalar Node.js con PATH habilitado
Start-Process msiexec.exe -ArgumentList "/i $downloadPath /quiet ADDLOCAL=ALL" -Wait

# Agregar Node.js al PATH si no está
$nodePath = "C:\Program Files\nodejs"
if (-Not ($env:Path -like "*$nodePath*")) {
    [Environment]::SetEnvironmentVariable("Path", $env:Path + ";$nodePath", [EnvironmentVariableTarget]::Machine)
}

Write-Host "✅ Node.js instalado y habilitado. Reinicia PowerShell o VS Code."
