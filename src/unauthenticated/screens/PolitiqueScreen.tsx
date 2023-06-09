import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/Feather";

import { useHardwareBackButton } from "./../../../components/useHardwareBackButton";

import { RootStackParamList } from "../../../utils/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";

export default function PolitiqueScreen({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParamList, "Politique">;
}) {
  useHardwareBackButton();
  const cguText = `Conditions générales d'utilisation

En vigueur au 19/06/2023
 

Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique des modalités de mise à disposition du site et des services par Lebonunivers.fr et de définir les conditions d’accès et d’utilisation des services par « l'Utilisateur ».
Les présentes CGU sont accessibles sur le site à la rubrique «CGU».

Toute inscription ou utilisation du site implique l'acceptation sans aucune réserve ni restriction des présentes CGU par l’utilisateur. Lors de l'inscription sur le site via le Formulaire d’inscription, chaque utilisateur accepte expressément les présentes CGU en cochant la case précédant le texte suivant : « Je reconnais avoir lu et compris les CGU et je les accepte ».
En cas de non-acceptation des CGU stipulées dans le présent contrat, l'Utilisateur se doit de renoncer à l'accès des services proposés par le site.
Re•Start  se réserve le droit de modifier unilatéralement et à tout moment le contenu des présentes CGU.

Article 1 : Les mentions légales

L’édition et la direction de la publication du site Re•Start est assurée par Johann Renault, domicilié 3710 Route de Ciboure À Olhette.
Adresse e-mail johann.renault@gmail.com.

L'hébergeur du site Re•Start est la société  Google LLC, dont le siège social est situé au Google LLC 1600 Amphitheatre Parkway Mountain View, CA 94043 USA, avec le numéro de téléphone : _______________.

ARTICLE 2 : Accès au site

Le site Re•Start  permet à l'Utilisateur un accès gratuit aux services suivants :
Le site internet propose les services suivants :
Application de soutien en développement personnel et gestion des émotions
Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion Internet, etc.) sont à sa charge.

L’Utilisateur non membre n'a pas accès aux services réservés. Pour cela, il doit s’inscrire en remplissant le formulaire. En acceptant de s’inscrire aux services réservés, l’Utilisateur membre s’engage à fournir des informations sincères et exactes concernant son état civil et ses coordonnées, notamment son adresse email.
Pour accéder aux services, l’Utilisateur doit ensuite s'identifier à l'aide de son identifiant et de son mot de passe qui lui seront communiqués après son inscription.
Tout Utilisateur membre régulièrement inscrit pourra également solliciter sa désinscription en se rendant à la page dédiée sur son espace personnel. Celle-ci sera effective dans un délai raisonnable.
Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement du site ou serveur et sous réserve de toute interruption ou modification en cas de maintenance, n'engage pas la responsabilité de Re•Start. Dans ces cas, l’Utilisateur accepte ainsi ne pas tenir rigueur à l’éditeur de toute interruption ou suspension de service, même sans préavis.
L'Utilisateur a la possibilité de contacter le site par messagerie électronique à l’adresse email de l’éditeur communiqué à l’ARTICLE 1.

ARTICLE 3 : Collecte des données

Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés. Le site est déclaré à la CNIL sous le numéro (en cours).
En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur exerce ce droit :
•         par mail à l'adresse email contact@lebonunivers.fr
•         via un formulaire de contact ;
 

ARTICLE 4 : Propriété intellectuelle

Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.

L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie des différents contenus. Il s'engage à une utilisation des contenus du site dans un cadre strictement privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite.
Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l’autorisation expresse de l’exploitant du site Internet constituerait une contrefaçon sanctionnée par l’article L 335-2 et suivants du Code de la propriété intellectuelle.
Il est rappelé conformément à l’article L122-5 du Code de propriété intellectuelle que l’Utilisateur qui reproduit, copie ou publie le contenu protégé doit citer l’auteur et sa source.
 
ARTICLE 5 : Responsabilité

Les sources des informations diffusées sur le site Re•Start sont réputées fiables mais le site ne garantit pas qu’il soit exempt de défauts, d’erreurs ou d’omissions.
Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle. Malgré des mises à jour régulières, le site Re•Start ne peut être tenu responsable de la modification des dispositions administratives et juridiques survenant après la publication. De même, le site ne peut être tenue responsable de l’utilisation et de l’interprétation de l’information contenue dans ce site.
L'Utilisateur s'assure de garder son mot de passe secret. Toute divulgation du mot de passe, quelle que soit sa forme, est interdite. Il assume les risques liés à l'utilisation de son identifiant et mot de passe. Le site décline toute responsabilité.
Le site Re•Start ne peut être tenu pour responsable d’éventuels virus qui pourraient infecter l’ordinateur ou tout matériel informatique de l’Internaute, suite à une utilisation, à l’accès, ou au téléchargement provenant de ce site.
La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et insurmontable d'un tiers.

ARTICLE 6 : Liens hypertextes

Des liens hypertextes peuvent être présents sur le site. L’Utilisateur est informé qu’en cliquant sur ces liens, il sortira du site Re•Start. Ce dernier n’a pas de contrôle sur les pages web sur lesquelles aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.

ARTICLE 7 : Cookies

L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement sur son logiciel de navigation.
Les cookies sont de petits fichiers stockés temporairement sur le disque dur de l’ordinateur de l’Utilisateur par votre navigateur et qui sont nécessaires à l’utilisation du site Re•Start. Les cookies ne contiennent pas d’information personnelle et ne peuvent pas être utilisés pour identifier quelqu’un. Un cookie contient un identifiant unique, généré aléatoirement et donc anonyme. Certains cookies expirent à la fin de la visite de l’Utilisateur, d’autres restent.
L’information contenue dans les cookies est utilisée pour améliorer le site Re•Start.
En naviguant sur le site, L’Utilisateur les accepte.
L’Utilisateur pourra désactiver ces cookies par l’intermédiaire des paramètres figurant au sein de son logiciel de navigation.

ARTICLE 8 : Publication par l’Utilisateur

Le site permet aux membres de publier les contenus suivants :
Texte, images.
Dans ses publications, le membre s’engage à respecter les règles de la Netiquette (règles de bonne conduite de l’internet) et les règles de droit en vigueur.
Le site peut exercer une modération sur les publications et se réserve le droit de refuser leur mise en ligne, sans avoir à s’en justifier auprès du membre.
Le membre reste titulaire de l’intégralité de ses droits de propriété intellectuelle. Mais en publiant une publication sur le site, il cède à la société éditrice le droit non exclusif et gratuit de représenter, reproduire, adapter, modifier, diffuser et distribuer sa publication, directement ou par un tiers autorisé, dans le monde entier, sur tout support (numérique ou physique), pour la durée de la propriété intellectuelle. Le Membre cède notamment le droit d'utiliser sa publication sur internet et sur les réseaux de téléphonie mobile.
La société éditrice s'engage à faire figurer le nom du membre à proximité de chaque utilisation de sa publication.
Tout contenu mis en ligne par l'Utilisateur est de sa seule responsabilité. L'Utilisateur s'engage à ne pas mettre en ligne de contenus pouvant porter atteinte aux intérêts de tierces personnes. Tout recours en justice engagé par un tiers lésé contre le site sera pris en charge par l'Utilisateur.
Le contenu de l'Utilisateur peut être à tout moment et pour n'importe quelle raison supprimé ou modifié par le site, sans préavis.
 
ARTICLE 9 : Droit applicable et juridiction compétente

La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.
Pour toute question relative à l’application des présentes CGU, vous pouvez joindre l’éditeur aux coordonnées inscrites à l’ARTICLE 1.

CGU réalisées sur http://legalplace.fr/
`;

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="rgba(0,0,0,1)" /> */}
      <View style={styles.goBackButtonRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <View style={styles.ellipseGoBackStack}>
            <Svg viewBox="0 0 28.06 28.06" style={styles.ellipseGoBack}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(255,255,255,1)"
                cx={14}
                cy={14}
                rx={14}
                ry={14}
              ></Ellipse>
            </Svg>
            <Icon name="chevron-left" style={styles.iconGoBack}></Icon>
          </View>
        </TouchableOpacity>
        <Text style={styles.conditionsGeneral}>
          Conditions Générales d'Utilisation
        </Text>
      </View>
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollArea_contentContainerStyle}
      >
        <Text style={styles.paragraph}>{cguText}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(236,246,255,1)",
  },
  goBackButtonRow: {
    height: 65,
    flexDirection: "row",
    marginTop: 46,

    // marginLeft: 19,
    //marginRight: 134,
  },
  goBackButton: {
    width: 32,
    height: 35,
  },
  ellipseGoBack: {
    top: 0,
    left: 0,
    width: 28,
    height: 28,
    position: "absolute",
  },
  iconGoBack: {
    top: 2,
    left: 0,
    position: "absolute",
    color: "rgba(113,119,181,1)",
    fontSize: 26,
  },
  ellipseGoBackStack: {
    width: 28,
    height: 28,
    marginTop: 2,
    marginLeft: 4,
  },
  conditionsGeneral: {
    fontFamily: "roboto700",
    color: "rgba(50,56,106,1)",
    fontSize: 20,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 5,
    textAlign: "center",
  },
  scrollArea: {
    width: 360,
    height: 789,
    marginTop: 22,
  },
  scrollArea_contentContainerStyle: {
    height: 5620,
    width: 360,
  },

  paragraph: {
    fontFamily: "roboto",
    color: "#121212",
    fontSize: 12,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 2,
    borderColor: "rgba(220,222,235,1)",
    borderRadius: 14,
    marginTop: 7,
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
  },
});
