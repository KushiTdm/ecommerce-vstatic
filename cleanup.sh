#!/bin/bash
# cleanup.sh - Script pour nettoyer le projet

echo "🧹 Nettoyage du projet pour déploiement statique..."

# 1. Supprimer les fichiers backend
echo "📁 Suppression des dossiers backend..."
rm -rf prisma/
rm -rf supabase/
rm -f render.yaml
echo "✅ Dossiers backend supprimés"

# 2. Supprimer les pages d'authentification
echo "🔐 Suppression des pages d'authentification..."
rm -f src/pages/LoginPage.tsx
rm -f src/pages/RegisterPage.tsx
echo "✅ Pages auth supprimées"

# 3. Supprimer le fichier supabase
echo "🗄️ Suppression du fichier supabase..."
rm -f src/lib/supabase.ts
echo "✅ Fichier supabase supprimé"

# 4. Vérifier les imports restants
echo "🔍 Vérification des imports supabase restants..."
if grep -r "from.*supabase" src/ 2>/dev/null; then
    echo "⚠️  ATTENTION: Des imports supabase ont été trouvés!"
    echo "📝 Fichiers concernés:"
    grep -r "from.*supabase" src/ 2>/dev/null | cut -d: -f1 | sort -u
    echo ""
    echo "❌ Veuillez remplacer ces fichiers avec les versions statiques"
    exit 1
else
    echo "✅ Aucun import supabase trouvé"
fi

# 5. Vérifier que les fichiers de données existent
echo "📦 Vérification des fichiers de données..."
if [ ! -f "src/data/products.ts" ]; then
    echo "❌ Fichier manquant: src/data/products.ts"
    exit 1
fi
if [ ! -f "src/data/categories.ts" ]; then
    echo "❌ Fichier manquant: src/data/categories.ts"
    exit 1
fi
if [ ! -f "src/lib/staticData.ts" ]; then
    echo "❌ Fichier manquant: src/lib/staticData.ts"
    exit 1
fi
echo "✅ Tous les fichiers de données sont présents"

# 6. Test de build
echo "🏗️ Test de build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ================================"
    echo "🎉 NETTOYAGE RÉUSSI!"
    echo "🎉 ================================"
    echo ""
    echo "✅ Projet prêt pour le déploiement"
    echo "📦 Build généré dans: dist/"
    echo ""
    echo "🚀 Prochaines étapes:"
    echo "   1. git add ."
    echo "   2. git commit -m 'Migration vers site statique'"
    echo "   3. git push"
    echo "   4. Déployer sur Netlify"
    echo ""
else
    echo ""
    echo "❌ ================================"
    echo "❌ ERREUR DE BUILD"
    echo "❌ ================================"
    echo ""
    echo "Le build a échoué. Vérifiez les erreurs ci-dessus."
    exit 1
fi