DOMAIN="angelica.kuteikina.ru"
LOCAL_SITE_DIR="./"

echo "uploading to cloud bucket"
gsutil web set -m index.html -e 404.html gs://$DOMAIN

echo "setting index and 404 pages"
gsutil web set -m index.html gs://angelica.kuteikina.ru
