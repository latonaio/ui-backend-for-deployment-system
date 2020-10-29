# デプロイメントシステムUIバックエンド
## 概要
* デプロイメントシステム
    * 別端末上でのkubernetesで稼働しているマイクロサービスの監視、デプロイ、削除

## 動作環境
### 1.前提条件
動作には以下の環境であることを前提とします。
* Ubuntu OS
* ARM CPU搭載のデバイス

### 2.事前準備
実行環境に以下のソフトウェアがインストールされている事を前提とします。
* kubernetesのインストール
* envoyのインストール
* project-yamlsのインストール
* aion-core-manifestsのインストール

## 機器構成
* エッジ端末2台以上(全てにこのUIリソースを配置する)

## kubernetes上での使用方法
### DBダンプファイルインポート(初回のみ)
1. mysql-kubeをkubernetesの同一namespace上に展開する。
2. 以下のコマンドでスキーマを作成する  
`$ mysql -u(ユーザー名) -p(パスワード) -h 127.0.0.1 -P(mysql-kubeのNode port番号)`  
`mysql> create database Deployment;`  
`mysql> create database Device;`  
`mysql> create database Pod;`  
`mysql> create database Project;`  
`mysql> exit;`  
3. 以下の手順でダンプファイルをインポートする  
`$ mysql -u(ユーザー名) -p(パスワード) -h 127.0.0.1 -P(mysql-kubeのNode port番号) Deployment < sql/Deployment_dump.sql`  
`$ mysql -u(ユーザー名) -p(パスワード) -h 127.0.0.1 -P(mysql-kubeのNode port番号) Device < sql/Device_dump.sql`  
`$ mysql -u(ユーザー名) -p(パスワード) -h 127.0.0.1 -P(mysql-kubeのNode port番号) Pod < sql/Pod_dump.sql`  
`$ mysql -u(ユーザー名) -p(パスワード) -h 127.0.0.1 -P(mysql-kubeのNode port番号) Project < sql/Project_dump.sql`  

### 起動方法
1. 以下のコマンドでDockerイメージをビルドする  
`$ bash docker-build.sh`
2. 以下のコマンドでkubernetesのマニュフェストファイルを作成  
`$ cp k8s/deployment.yml.template k8s/deployment.yml`  
3. k8s/deployment.ymlのMySQL設定を書き換える  
MYSQL_USERをMySQLユーザー名  
MYSQL_PASSWORDをMySQLパスワード  

4. 以下コマンドでkubernetes上にリソースを展開する  
`$ kubectl apply -f k8s/`

### 停止方法
1. 以下のコマンドでkubernetes上からリソースを削除する  
`$ kubectl delete -f k8s/`