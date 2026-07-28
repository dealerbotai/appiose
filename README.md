# Eskin Store iOS App

App iOS para la tienda de botas **Eskin**, construida con React Native y compilada con [ios-builder](https://github.com/MobAI-App/ios-builder) desde Windows/Linux.

> **🏗️ ¿Qué es ios-builder?**
> Compila tu app iOS usando GitHub Actions (macOS runners) desde cualquier SO. Descarga el `.ipa` directo a tu PC.

## 📋 Requisitos

- Node.js >= 22
- npm >= 10
- Cuenta de GitHub
- [builder.exe (ios-builder CLI)](https://github.com/MobAI-App/ios-builder/releases)

## 🚀 Setup rápido

```bash
# 1. Clonar / ir al proyecto
cd appios

# 2. Instalar dependencias de Node
npm install

# 3. Autenticar ios-builder con GitHub
builder auth github

# 4. Inicializar ios-builder (crea el workflow)
builder init

# 5. Subir a GitHub
git init
git add .
git commit -m "Eskin Store iOS"
git remote add origin https://github.com/TU_USUARIO/ekeskinshop-ios.git
git push -u origin main

# 6. Compilar y generar IPA 🎉
builder ios build --unsigned
```

El IPA se descarga automáticamente a `./dist/`.

## 📱 Funcionalidades

| Pantalla | Descripción |
|----------|-------------|
| **Catálogo** | Grid de productos con imagen, nombre y precio |
| **Detalle** | Descripción, características, selector de talla y WhatsApp |

## 🛠️ Personalizar antes de compilar

| Archivo | Editar |
|---------|--------|
| `src/data/config.ts` | 🟡 **Número de WhatsApp** (línea `WHATSAPP_NUMBER: '521...'`) |
| `builder.json` | 🟡 Tu usuario y repo de GitHub (`owner` / `repo`) |

## 📦 Productos incluidos

Todos los modelos de la tienda online con imágenes desde Supabase:

- `MOD.2601` Bota Clásica · `MOD.2602` Urbana · `MOD.2603` Montaña
- `MOD.2604` · `MOD.2605` · `MOD.4001` · `MOD.9270`–`MOD.9275`
- Tallas: 12–26 · Precios: $899 / $1399 MXN

## 📸 Tecnologías

- **React Native 0.86** + TypeScript
- **React Navigation 7** (navegación nativa)
- **WhatsApp API** para pedidos
- **Supabase CDN** para imágenes
- **ios-builder** para compilar IPA desde Windows
