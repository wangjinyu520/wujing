<template>
  <div>
    <el-cascader
      ref="cascaderAddr"
      :options="options"
      :props="optionProps"
      v-model="selectedOptions"
      style="width:100%"
      expand-trigger="hover"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { listProvince } from '@/api/common'
export default {
  name: 'Province1',
  props: {
    items: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      selectedOptions: [],
      provinceId: undefined,
      cityId: undefined,
      districId: undefined,
      provinceName: '', // 省
      cityName: '', // 市
      districtName: '', // 区
      optionProps: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      query: {
        parentId: undefined
      },
      options: [
        {
          id: 1,
          name: '北京市',
          children: [
            {
              id: 45053,
              name: '北京市',
              children: [
                { id: 37, name: '东城区', children: null },
                { id: 38, name: '西城区', children: null },
                { id: 39, name: '崇文区', children: null },
                { id: 40, name: '宣武区', children: null },
                { id: 41, name: '朝阳区', children: null },
                { id: 42, name: '丰台区', children: null },
                { id: 43, name: '石景山区', children: null },
                { id: 44, name: '海淀区', children: null },
                { id: 45, name: '门头沟区', children: null },
                { id: 46, name: '房山区', children: null },
                { id: 47, name: '通州区', children: null },
                { id: 48, name: '顺义区', children: null },
                { id: 49, name: '昌平区', children: null },
                { id: 50, name: '大兴区', children: null },
                { id: 51, name: '怀柔区', children: null },
                { id: 52, name: '平谷区', children: null },
                { id: 53, name: '密云县', children: null },
                { id: 54, name: '延庆县', children: null }
              ]
            }
          ]
        },
        {
          id: 2,
          name: '天津市',
          children: [
            {
              id: 45054,
              name: '天津市',
              children: [
                { id: 55, name: '和平区', children: null },
                { id: 56, name: '河东区', children: null },
                { id: 57, name: '河西区', children: null },
                { id: 58, name: '南开区', children: null },
                { id: 59, name: '河北区', children: null },
                { id: 60, name: '红桥区', children: null },
                { id: 61, name: '塘沽区', children: null },
                { id: 62, name: '汉沽区', children: null },
                { id: 63, name: '大港区', children: null },
                { id: 64, name: '东丽区', children: null },
                { id: 65, name: '西青区', children: null },
                { id: 66, name: '津南区', children: null },
                { id: 67, name: '北辰区', children: null },
                { id: 68, name: '武清区', children: null },
                { id: 69, name: '宝坻区', children: null },
                { id: 70, name: '宁河县', children: null },
                { id: 71, name: '静海县', children: null },
                { id: 72, name: '蓟县', children: null }
              ]
            }
          ]
        },
        {
          id: 3,
          name: '河北省',
          children: [
            {
              id: 73,
              name: '石家庄市',
              children: [
                { id: 1126, name: '井陉县', children: null },
                { id: 1127, name: '井陉矿区', children: null },
                { id: 1128, name: '元氏县', children: null },
                { id: 1129, name: '平山县', children: null },
                { id: 1130, name: '新乐市', children: null },
                { id: 1131, name: '新华区', children: null },
                { id: 1132, name: '无极县', children: null },
                { id: 1133, name: '晋州市', children: null },
                { id: 1134, name: '栾城县', children: null },
                { id: 1135, name: '桥东区', children: null },
                { id: 1136, name: '桥西区', children: null },
                { id: 1137, name: '正定县', children: null },
                { id: 1138, name: '深泽县', children: null },
                { id: 1139, name: '灵寿县', children: null },
                { id: 1140, name: '藁城市', children: null },
                { id: 1141, name: '行唐县', children: null },
                { id: 1142, name: '裕华区', children: null },
                { id: 1143, name: '赞皇县', children: null },
                { id: 1144, name: '赵县', children: null },
                { id: 1145, name: '辛集市', children: null },
                { id: 1146, name: '长安区', children: null },
                { id: 1147, name: '高邑县', children: null },
                { id: 1148, name: '鹿泉市', children: null }
              ]
            },
            {
              id: 74,
              name: '唐山市',
              children: [
                { id: 1149, name: '丰南区', children: null },
                { id: 1150, name: '丰润区', children: null },
                { id: 1151, name: '乐亭县', children: null },
                { id: 1152, name: '古冶区', children: null },
                { id: 1153, name: '唐海县', children: null },
                { id: 1154, name: '开平区', children: null },
                { id: 1155, name: '滦南县', children: null },
                { id: 1156, name: '滦县', children: null },
                { id: 1157, name: '玉田县', children: null },
                { id: 1158, name: '路北区', children: null },
                { id: 1159, name: '路南区', children: null },
                { id: 1160, name: '迁安市', children: null },
                { id: 1161, name: '迁西县', children: null },
                { id: 1162, name: '遵化市', children: null }
              ]
            },
            {
              id: 75,
              name: '秦皇岛市',
              children: [
                { id: 1163, name: '北戴河区', children: null },
                { id: 1164, name: '卢龙县', children: null },
                { id: 1165, name: '山海关区', children: null },
                { id: 1166, name: '抚宁县', children: null },
                { id: 1167, name: '昌黎县', children: null },
                { id: 1168, name: '海港区', children: null },
                { id: 1169, name: '青龙满族自治县', children: null }
              ]
            },
            {
              id: 76,
              name: '邯郸市',
              children: [
                { id: 1170, name: '丛台区', children: null },
                { id: 1171, name: '临漳县', children: null },
                { id: 1172, name: '复兴区', children: null },
                { id: 1173, name: '大名县', children: null },
                { id: 1174, name: '峰峰矿区', children: null },
                { id: 1175, name: '广平县', children: null },
                { id: 1176, name: '成安县', children: null },
                { id: 1177, name: '曲周县', children: null },
                { id: 1178, name: '武安市', children: null },
                { id: 1179, name: '永年县', children: null },
                { id: 1180, name: '涉县', children: null },
                { id: 1181, name: '磁县', children: null },
                { id: 1182, name: '肥乡县', children: null },
                { id: 1183, name: '邯山区', children: null },
                { id: 1184, name: '邯郸县', children: null },
                { id: 1185, name: '邱县', children: null },
                { id: 1186, name: '馆陶县', children: null },
                { id: 1187, name: '魏县', children: null },
                { id: 1188, name: '鸡泽县', children: null }
              ]
            },
            {
              id: 77,
              name: '邢台市',
              children: [
                { id: 1189, name: '临城县', children: null },
                { id: 1190, name: '临西县', children: null },
                { id: 1191, name: '任县', children: null },
                { id: 1192, name: '内丘县', children: null },
                { id: 1193, name: '南和县', children: null },
                { id: 1194, name: '南宫市', children: null },
                { id: 1195, name: '威县', children: null },
                { id: 1196, name: '宁晋县', children: null },
                { id: 1197, name: '巨鹿县', children: null },
                { id: 1198, name: '平乡县', children: null },
                { id: 1199, name: '广宗县', children: null },
                { id: 1200, name: '新河县', children: null },
                { id: 1201, name: '柏乡县', children: null },
                { id: 1202, name: '桥东区', children: null },
                { id: 1203, name: '桥西区', children: null },
                { id: 1204, name: '沙河市', children: null },
                { id: 1205, name: '清河县', children: null },
                { id: 1206, name: '邢台县', children: null },
                { id: 1207, name: '隆尧县', children: null }
              ]
            },
            {
              id: 78,
              name: '保定市',
              children: [
                { id: 1208, name: '北市区', children: null },
                { id: 1209, name: '南市区', children: null },
                { id: 1210, name: '博野县', children: null },
                { id: 1211, name: '唐县', children: null },
                { id: 1212, name: '安国市', children: null },
                { id: 1213, name: '安新县', children: null },
                { id: 1214, name: '定兴县', children: null },
                { id: 1215, name: '定州市', children: null },
                { id: 1216, name: '容城县', children: null },
                { id: 1217, name: '徐水县', children: null },
                { id: 1218, name: '新市区', children: null },
                { id: 1219, name: '易县', children: null },
                { id: 1220, name: '曲阳县', children: null },
                { id: 1221, name: '望都县', children: null },
                { id: 1222, name: '涞水县', children: null },
                { id: 1223, name: '涞源县', children: null },
                { id: 1224, name: '涿州市', children: null },
                { id: 1225, name: '清苑县', children: null },
                { id: 1226, name: '满城县', children: null },
                { id: 1227, name: '蠡县', children: null },
                { id: 1228, name: '阜平县', children: null },
                { id: 1229, name: '雄县', children: null },
                { id: 1230, name: '顺平县', children: null },
                { id: 1231, name: '高碑店市', children: null },
                { id: 1232, name: '高阳县', children: null }
              ]
            },
            {
              id: 79,
              name: '张家口市',
              children: [
                { id: 1233, name: '万全县', children: null },
                { id: 1234, name: '下花园区', children: null },
                { id: 1235, name: '宣化区', children: null },
                { id: 1236, name: '宣化县', children: null },
                { id: 1237, name: '尚义县', children: null },
                { id: 1238, name: '崇礼县', children: null },
                { id: 1239, name: '康保县', children: null },
                { id: 1240, name: '张北县', children: null },
                { id: 1241, name: '怀安县', children: null },
                { id: 1242, name: '怀来县', children: null },
                { id: 1243, name: '桥东区', children: null },
                { id: 1244, name: '桥西区', children: null },
                { id: 1245, name: '沽源县', children: null },
                { id: 1246, name: '涿鹿县', children: null },
                { id: 1247, name: '蔚县', children: null },
                { id: 1248, name: '赤城县', children: null },
                { id: 1249, name: '阳原县', children: null }
              ]
            },
            {
              id: 80,
              name: '承德市',
              children: [
                { id: 1250, name: '丰宁满族自治县', children: null },
                { id: 1251, name: '兴隆县', children: null },
                { id: 1252, name: '双桥区', children: null },
                { id: 1253, name: '双滦区', children: null },
                { id: 1254, name: '围场满族蒙古族自治县', children: null },
                { id: 1255, name: '宽城满族自治县', children: null },
                { id: 1256, name: '平泉县', children: null },
                { id: 1257, name: '承德县', children: null },
                { id: 1258, name: '滦平县', children: null },
                { id: 1259, name: '隆化县', children: null },
                { id: 1260, name: '鹰手营子矿区', children: null }
              ]
            },
            {
              id: 81,
              name: '衡水市',
              children: [
                { id: 1261, name: '冀州市', children: null },
                { id: 1262, name: '安平县', children: null },
                { id: 1263, name: '故城县', children: null },
                { id: 1264, name: '景县', children: null },
                { id: 1265, name: '枣强县', children: null },
                { id: 1266, name: '桃城区', children: null },
                { id: 1267, name: '武强县', children: null },
                { id: 1268, name: '武邑县', children: null },
                { id: 1269, name: '深州市', children: null },
                { id: 1270, name: '阜城县', children: null },
                { id: 1271, name: '饶阳县', children: null }
              ]
            },
            {
              id: 82,
              name: '廊坊市',
              children: [
                { id: 1280, name: '霸州市', children: null },
                { id: 1281, name: '香河县', children: null },
                { id: 1272, name: '三河市', children: null },
                { id: 1273, name: '固安县', children: null },
                { id: 1274, name: '大厂回族自治县', children: null },
                { id: 1275, name: '大城县', children: null },
                { id: 1276, name: '安次区', children: null },
                { id: 1277, name: '广阳区', children: null },
                { id: 1278, name: '文安县', children: null },
                { id: 1279, name: '永清县', children: null }
              ]
            },
            {
              id: 83,
              name: '沧州市',
              children: [
                { id: 1282, name: '东光县', children: null },
                { id: 1283, name: '任丘市', children: null },
                { id: 1284, name: '南皮县', children: null },
                { id: 1285, name: '吴桥县', children: null },
                { id: 1286, name: '孟村回族自治县', children: null },
                { id: 1287, name: '新华区', children: null },
                { id: 1288, name: '沧县', children: null },
                { id: 1289, name: '河间市', children: null },
                { id: 1290, name: '泊头市', children: null },
                { id: 1291, name: '海兴县', children: null },
                { id: 1292, name: '献县', children: null },
                { id: 1293, name: '盐山县', children: null },
                { id: 1294, name: '肃宁县', children: null },
                { id: 1295, name: '运河区', children: null },
                { id: 1296, name: '青县', children: null },
                { id: 1297, name: '黄骅市', children: null }
              ]
            }
          ]
        },
        {
          id: 4,
          name: '山西省',
          children: [
            {
              id: 84,
              name: '太原市',
              children: [
                { id: 1298, name: '万柏林区', children: null },
                { id: 1299, name: '古交市', children: null },
                { id: 1300, name: '娄烦县', children: null },
                { id: 1301, name: '小店区', children: null },
                { id: 1302, name: '尖草坪区', children: null },
                { id: 1303, name: '晋源区', children: null },
                { id: 1304, name: '杏花岭区', children: null },
                { id: 1305, name: '清徐县', children: null },
                { id: 1306, name: '迎泽区', children: null },
                { id: 1307, name: '阳曲县', children: null }
              ]
            },
            {
              id: 85,
              name: '大同市',
              children: [
                { id: 1308, name: '南郊区', children: null },
                { id: 1309, name: '城区', children: null },
                { id: 1310, name: '大同县', children: null },
                { id: 1311, name: '天镇县', children: null },
                { id: 1312, name: '左云县', children: null },
                { id: 1313, name: '广灵县', children: null },
                { id: 1314, name: '新荣区', children: null },
                { id: 1315, name: '浑源县', children: null },
                { id: 1316, name: '灵丘县', children: null },
                { id: 1317, name: '矿区', children: null },
                { id: 1318, name: '阳高县', children: null }
              ]
            },
            {
              id: 86,
              name: '阳泉市',
              children: [
                { id: 1319, name: '城区', children: null },
                { id: 1320, name: '平定县', children: null },
                { id: 1321, name: '盂县', children: null },
                { id: 1322, name: '矿区', children: null },
                { id: 1323, name: '郊区', children: null }
              ]
            },
            {
              id: 87,
              name: '长治市',
              children: [
                { id: 1324, name: '城区', children: null },
                { id: 1325, name: '壶关县', children: null },
                { id: 1326, name: '屯留县', children: null },
                { id: 1327, name: '平顺县', children: null },
                { id: 1328, name: '武乡县', children: null },
                { id: 1329, name: '沁县', children: null },
                { id: 1330, name: '沁源县', children: null },
                { id: 1331, name: '潞城市', children: null },
                { id: 1332, name: '襄垣县', children: null },
                { id: 1333, name: '郊区', children: null },
                { id: 1334, name: '长子县', children: null },
                { id: 1335, name: '长治县', children: null },
                { id: 1336, name: '黎城县', children: null }
              ]
            },
            {
              id: 88,
              name: '晋城市',
              children: [
                { id: 1337, name: '城区', children: null },
                { id: 1338, name: '沁水县', children: null },
                { id: 1339, name: '泽州县', children: null },
                { id: 1340, name: '阳城县', children: null },
                { id: 1341, name: '陵川县', children: null },
                { id: 1342, name: '高平市', children: null }
              ]
            },
            {
              id: 89,
              name: '朔州市',
              children: [
                { id: 1343, name: '右玉县', children: null },
                { id: 1344, name: '山阴县', children: null },
                { id: 1345, name: '平鲁区', children: null },
                { id: 1346, name: '应县', children: null },
                { id: 1347, name: '怀仁县', children: null },
                { id: 1348, name: '朔城区', children: null }
              ]
            },
            {
              id: 90,
              name: '晋中市',
              children: [
                { id: 1349, name: '介休市', children: null },
                { id: 1350, name: '和顺县', children: null },
                { id: 1351, name: '太谷县', children: null },
                { id: 1352, name: '寿阳县', children: null },
                { id: 1353, name: '左权县', children: null },
                { id: 1354, name: '平遥县', children: null },
                { id: 1355, name: '昔阳县', children: null },
                { id: 1356, name: '榆次区', children: null },
                { id: 1357, name: '榆社县', children: null },
                { id: 1358, name: '灵石县', children: null },
                { id: 1359, name: '祁县', children: null }
              ]
            },
            {
              id: 91,
              name: '运城市',
              children: [
                { id: 1360, name: '万荣县', children: null },
                { id: 1361, name: '临猗县', children: null },
                { id: 1362, name: '垣曲县', children: null },
                { id: 1363, name: '夏县', children: null },
                { id: 1364, name: '平陆县', children: null },
                { id: 1365, name: '新绛县', children: null },
                { id: 1366, name: '永济市', children: null },
                { id: 1367, name: '河津市', children: null },
                { id: 1368, name: '盐湖区', children: null },
                { id: 1369, name: '稷山县', children: null },
                { id: 1370, name: '绛县', children: null },
                { id: 1371, name: '芮城县', children: null },
                { id: 1372, name: '闻喜县', children: null }
              ]
            },
            {
              id: 92,
              name: '忻州市',
              children: [
                { id: 1373, name: '五台县', children: null },
                { id: 1374, name: '五寨县', children: null },
                { id: 1375, name: '代县', children: null },
                { id: 1376, name: '保德县', children: null },
                { id: 1377, name: '偏关县', children: null },
                { id: 1378, name: '原平市', children: null },
                { id: 1379, name: '宁武县', children: null },
                { id: 1380, name: '定襄县', children: null },
                { id: 1381, name: '岢岚县', children: null },
                { id: 1382, name: '忻府区', children: null },
                { id: 1383, name: '河曲县', children: null },
                { id: 1384, name: '神池县', children: null },
                { id: 1385, name: '繁峙县', children: null },
                { id: 1386, name: '静乐县', children: null }
              ]
            },
            {
              id: 93,
              name: '临汾市',
              children: [
                { id: 1387, name: '乡宁县', children: null },
                { id: 1388, name: '侯马市', children: null },
                { id: 1389, name: '古县', children: null },
                { id: 1390, name: '吉县', children: null },
                { id: 1391, name: '大宁县', children: null },
                { id: 1392, name: '安泽县', children: null },
                { id: 1393, name: '尧都区', children: null },
                { id: 1394, name: '曲沃县', children: null },
                { id: 1395, name: '永和县', children: null },
                { id: 1396, name: '汾西县', children: null },
                { id: 1397, name: '洪洞县', children: null },
                { id: 1398, name: '浮山县', children: null },
                { id: 1399, name: '翼城县', children: null },
                { id: 1400, name: '蒲县', children: null },
                { id: 1401, name: '襄汾县', children: null },
                { id: 1402, name: '隰县', children: null },
                { id: 1403, name: '霍州市', children: null }
              ]
            },
            {
              id: 94,
              name: '吕梁市',
              children: [
                { id: 1404, name: '中阳县', children: null },
                { id: 1405, name: '临县', children: null },
                { id: 1406, name: '交口县', children: null },
                { id: 1407, name: '交城县', children: null },
                { id: 1408, name: '兴县', children: null },
                { id: 1409, name: '孝义市', children: null },
                { id: 1410, name: '岚县', children: null },
                { id: 1411, name: '文水县', children: null },
                { id: 1412, name: '方山县', children: null },
                { id: 1413, name: '柳林县', children: null },
                { id: 1414, name: '汾阳市', children: null },
                { id: 1415, name: '石楼县', children: null },
                { id: 1416, name: '离石区', children: null }
              ]
            }
          ]
        },
        {
          id: 5,
          name: '内蒙古自治区',
          children: [
            {
              id: 95,
              name: '呼和浩特市',
              children: [
                { id: 1417, name: '和林格尔县', children: null },
                { id: 1418, name: '回民区', children: null },
                { id: 1419, name: '土默特左旗', children: null },
                { id: 1420, name: '托克托县', children: null },
                { id: 1421, name: '新城区', children: null },
                { id: 1422, name: '武川县', children: null },
                { id: 1423, name: '清水河县', children: null },
                { id: 1424, name: '玉泉区', children: null },
                { id: 1425, name: '赛罕区', children: null }
              ]
            },
            {
              id: 96,
              name: '包头市',
              children: [
                { id: 1426, name: '东河区', children: null },
                { id: 1427, name: '九原区', children: null },
                { id: 1428, name: '固阳县', children: null },
                { id: 1429, name: '土默特右旗', children: null },
                { id: 1430, name: '昆都仑区', children: null },
                { id: 1431, name: '白云矿区', children: null },
                { id: 1432, name: '石拐区', children: null },
                { id: 1433, name: '达尔罕茂明安联合旗', children: null },
                { id: 1434, name: '青山区', children: null }
              ]
            },
            {
              id: 97,
              name: '乌海市',
              children: [
                { id: 1435, name: '乌达区', children: null },
                { id: 1436, name: '海勃湾区', children: null },
                { id: 1437, name: '海南区', children: null }
              ]
            },
            {
              id: 98,
              name: '赤峰市',
              children: [
                { id: 1438, name: '元宝山区', children: null },
                { id: 1439, name: '克什克腾旗', children: null },
                { id: 1440, name: '喀喇沁旗', children: null },
                { id: 1441, name: '宁城县', children: null },
                { id: 1442, name: '巴林右旗', children: null },
                { id: 1443, name: '巴林左旗', children: null },
                { id: 1444, name: '敖汉旗', children: null },
                { id: 1445, name: '松山区', children: null },
                { id: 1446, name: '林西县', children: null },
                { id: 1447, name: '红山区', children: null },
                { id: 1448, name: '翁牛特旗', children: null },
                { id: 1449, name: '阿鲁科尔沁旗', children: null }
              ]
            },
            {
              id: 99,
              name: '通辽市',
              children: [
                { id: 1450, name: '奈曼旗', children: null },
                { id: 1451, name: '库伦旗', children: null },
                { id: 1452, name: '开鲁县', children: null },
                { id: 1453, name: '扎鲁特旗', children: null },
                { id: 1454, name: '科尔沁区', children: null },
                { id: 1455, name: '科尔沁左翼中旗', children: null },
                { id: 1456, name: '科尔沁左翼后旗', children: null },
                { id: 1457, name: '霍林郭勒市', children: null }
              ]
            },
            {
              id: 100,
              name: '鄂尔多斯市',
              children: [
                { id: 1458, name: '东胜区', children: null },
                { id: 1459, name: '乌审旗', children: null },
                { id: 1460, name: '伊金霍洛旗', children: null },
                { id: 1461, name: '准格尔旗', children: null },
                { id: 1462, name: '杭锦旗', children: null },
                { id: 1463, name: '达拉特旗', children: null },
                { id: 1464, name: '鄂东胜区', children: null },
                { id: 1465, name: '鄂托克前旗', children: null },
                { id: 1466, name: '鄂托克旗', children: null }
              ]
            },
            {
              id: 101,
              name: '呼伦贝尔市',
              children: [
                { id: 1467, name: '扎兰屯市', children: null },
                { id: 1468, name: '新巴尔虎右旗', children: null },
                { id: 1469, name: '新巴尔虎左旗', children: null },
                { id: 1470, name: '根河市', children: null },
                { id: 1471, name: '海拉尔区', children: null },
                { id: 1472, name: '满洲里市', children: null },
                { id: 1473, name: '牙克石市', children: null },
                { id: 1474, name: '莫力达瓦达斡尔族自治旗', children: null },
                { id: 1475, name: '鄂伦春自治旗', children: null },
                { id: 1476, name: '鄂温克族自治旗', children: null },
                { id: 1477, name: '阿荣旗', children: null },
                { id: 1478, name: '陈巴尔虎旗', children: null },
                { id: 1479, name: '额尔古纳市', children: null }
              ]
            },
            {
              id: 102,
              name: '巴彦淖尔市',
              children: [
                { id: 1480, name: '临河区', children: null },
                { id: 1481, name: '乌拉特中旗', children: null },
                { id: 1482, name: '乌拉特前旗', children: null },
                { id: 1483, name: '乌拉特后旗', children: null },
                { id: 1484, name: '五原县', children: null },
                { id: 1485, name: '杭锦后旗', children: null },
                { id: 1486, name: '磴口县', children: null }
              ]
            },
            {
              id: 103,
              name: '乌兰察布市',
              children: [
                { id: 1487, name: '丰镇市', children: null },
                { id: 1488, name: '兴和县', children: null },
                { id: 1489, name: '凉城县', children: null },
                { id: 1490, name: '化德县', children: null },
                { id: 1491, name: '卓资县', children: null },
                { id: 1492, name: '商都县', children: null },
                { id: 1493, name: '四子王旗', children: null },
                { id: 1494, name: '察哈尔右翼中旗', children: null },
                { id: 1495, name: '察哈尔右翼前旗', children: null },
                { id: 1496, name: '察哈尔右翼后旗', children: null },
                { id: 1497, name: '集宁区', children: null }
              ]
            },
            {
              id: 104,
              name: '兴安盟',
              children: [
                { id: 1498, name: '乌兰浩特市', children: null },
                { id: 1499, name: '扎赉特旗', children: null },
                { id: 1500, name: '科尔沁右翼中旗', children: null },
                { id: 1501, name: '科尔沁右翼前旗', children: null },
                { id: 1502, name: '突泉县', children: null },
                { id: 1503, name: '阿尔山市', children: null }
              ]
            },
            {
              id: 105,
              name: '锡林郭勒盟',
              children: [
                { id: 1504, name: '东乌珠穆沁旗', children: null },
                { id: 1505, name: '二连浩特市', children: null },
                { id: 1506, name: '多伦县', children: null },
                { id: 1507, name: '太仆寺旗', children: null },
                { id: 1508, name: '正蓝旗', children: null },
                { id: 1509, name: '正镶白旗', children: null },
                { id: 1510, name: '苏尼特右旗', children: null },
                { id: 1511, name: '苏尼特左旗', children: null },
                { id: 1512, name: '西乌珠穆沁旗', children: null },
                { id: 1513, name: '锡林浩特市', children: null },
                { id: 1514, name: '镶黄旗', children: null },
                { id: 1515, name: '阿巴嘎旗', children: null }
              ]
            },
            {
              id: 106,
              name: '阿拉善盟',
              children: [
                { id: 1516, name: '阿拉善右旗', children: null },
                { id: 1517, name: '阿拉善左旗', children: null },
                { id: 1518, name: '额济纳旗', children: null }
              ]
            }
          ]
        },
        {
          id: 6,
          name: '辽宁省',
          children: [
            {
              id: 107,
              name: '沈阳市',
              children: [
                { id: 1519, name: '东陵区', children: null },
                { id: 1520, name: '于洪区', children: null },
                { id: 1521, name: '和平区', children: null },
                { id: 1522, name: '大东区', children: null },
                { id: 1523, name: '康平县', children: null },
                { id: 1524, name: '新民市', children: null },
                { id: 1525, name: '沈北新区', children: null },
                { id: 1526, name: '沈河区', children: null },
                { id: 1527, name: '法库县', children: null },
                { id: 1528, name: '皇姑区', children: null },
                { id: 1529, name: '苏家屯区', children: null },
                { id: 1530, name: '辽中县', children: null },
                { id: 1531, name: '铁西区', children: null }
              ]
            },
            {
              id: 108,
              name: '大连市',
              children: [
                { id: 1536, name: '沙河口区', children: null },
                { id: 1537, name: '瓦房店市', children: null },
                { id: 1538, name: '甘井子区', children: null },
                { id: 1539, name: '西岗区', children: null },
                { id: 1540, name: '金州区', children: null },
                { id: 1541, name: '长海县', children: null },
                { id: 1532, name: '中山区', children: null },
                { id: 1533, name: '庄河市', children: null },
                { id: 1534, name: '旅顺口区', children: null },
                { id: 1535, name: '普兰店市', children: null }
              ]
            },
            {
              id: 109,
              name: '鞍山市',
              children: [
                { id: 1542, name: '千山区', children: null },
                { id: 1543, name: '台安县', children: null },
                { id: 1544, name: '岫岩满族自治县', children: null },
                { id: 1545, name: '海城市', children: null },
                { id: 1546, name: '立山区', children: null },
                { id: 1547, name: '铁东区', children: null },
                { id: 1548, name: '铁西区', children: null }
              ]
            },
            {
              id: 110,
              name: '抚顺市',
              children: [
                { id: 1549, name: '东洲区', children: null },
                { id: 1550, name: '抚顺县', children: null },
                { id: 1551, name: '新宾满族自治县', children: null },
                { id: 1552, name: '新抚区', children: null },
                { id: 1553, name: '望花区', children: null },
                { id: 1554, name: '清原满族自治县', children: null },
                { id: 1555, name: '顺城区', children: null }
              ]
            },
            {
              id: 111,
              name: '本溪市',
              children: [
                { id: 1556, name: '南芬区', children: null },
                { id: 1557, name: '平山区', children: null },
                { id: 1558, name: '明山区', children: null },
                { id: 1559, name: '本溪满族自治县', children: null },
                { id: 1560, name: '桓仁满族自治县', children: null },
                { id: 1561, name: '溪湖区', children: null }
              ]
            },
            {
              id: 112,
              name: '丹东市',
              children: [
                { id: 1562, name: '东港市', children: null },
                { id: 1563, name: '元宝区', children: null },
                { id: 1564, name: '凤城市', children: null },
                { id: 1565, name: '宽甸满族自治县', children: null },
                { id: 1566, name: '振兴区', children: null },
                { id: 1567, name: '振安区', children: null }
              ]
            },
            {
              id: 113,
              name: '锦州市',
              children: [
                { id: 1568, name: '义县', children: null },
                { id: 1569, name: '凌河区', children: null },
                { id: 1570, name: '凌海市', children: null },
                { id: 1571, name: '北镇市', children: null },
                { id: 1572, name: '古塔区', children: null },
                { id: 1573, name: '太和区', children: null },
                { id: 1574, name: '黑山县', children: null }
              ]
            },
            {
              id: 114,
              name: '营口市',
              children: [
                { id: 1575, name: '大石桥市', children: null },
                { id: 1576, name: '盖州市', children: null },
                { id: 1577, name: '站前区', children: null },
                { id: 1578, name: '老边区', children: null },
                { id: 1579, name: '西市区', children: null },
                { id: 1580, name: '鲅鱼圈区', children: null }
              ]
            },
            {
              id: 115,
              name: '阜新市',
              children: [
                { id: 1581, name: '太平区', children: null },
                { id: 1582, name: '彰武县', children: null },
                { id: 1583, name: '新邱区', children: null },
                { id: 1584, name: '海州区', children: null },
                { id: 1585, name: '清河门区', children: null },
                { id: 1586, name: '细河区', children: null },
                { id: 1587, name: '蒙古族自治县', children: null }
              ]
            },
            {
              id: 116,
              name: '辽阳市',
              children: [
                { id: 1588, name: '太子河区', children: null },
                { id: 1589, name: '宏伟区', children: null },
                { id: 1590, name: '弓长岭区', children: null },
                { id: 1591, name: '文圣区', children: null },
                { id: 1592, name: '灯塔市', children: null },
                { id: 1593, name: '白塔区', children: null },
                { id: 1594, name: '辽阳县', children: null }
              ]
            },
            {
              id: 117,
              name: '盘锦市',
              children: [
                { id: 1595, name: '兴隆台区', children: null },
                { id: 1596, name: '双台子区', children: null },
                { id: 1597, name: '大洼县', children: null },
                { id: 1598, name: '盘山县', children: null }
              ]
            },
            {
              id: 118,
              name: '铁岭市',
              children: [
                { id: 1599, name: '开原市', children: null },
                { id: 1600, name: '昌图县', children: null },
                { id: 1601, name: '清河区', children: null },
                { id: 1602, name: '西丰县', children: null },
                { id: 1603, name: '调兵山市', children: null },
                { id: 1604, name: '铁岭县', children: null },
                { id: 1605, name: '银州区', children: null }
              ]
            },
            {
              id: 119,
              name: '朝阳市',
              children: [
                { id: 1606, name: '凌源市', children: null },
                { id: 1607, name: '北票市', children: null },
                { id: 1608, name: '双塔区', children: null },
                { id: 1609, name: '喀喇沁左翼蒙古族自治县', children: null },
                { id: 1610, name: '建平县', children: null },
                { id: 1611, name: '朝阳县', children: null },
                { id: 1612, name: '龙城区', children: null }
              ]
            },
            {
              id: 120,
              name: '葫芦岛市',
              children: [
                { id: 1613, name: '兴城市', children: null },
                { id: 1614, name: '南票区', children: null },
                { id: 1615, name: '建昌县', children: null },
                { id: 1616, name: '绥中县', children: null },
                { id: 1617, name: '连山区', children: null },
                { id: 1618, name: '龙港区', children: null }
              ]
            }
          ]
        },
        {
          id: 7,
          name: '吉林省',
          children: [
            {
              id: 121,
              name: '长春市',
              children: [
                { id: 1619, name: '九台市', children: null },
                { id: 1620, name: '二道区', children: null },
                { id: 1621, name: '农安县', children: null },
                { id: 1622, name: '南关区', children: null },
                { id: 1623, name: '双阳区', children: null },
                { id: 1624, name: '宽城区', children: null },
                { id: 1625, name: '德惠市', children: null },
                { id: 1626, name: '朝阳区', children: null },
                { id: 1627, name: '榆树市', children: null },
                { id: 1628, name: '绿园区', children: null }
              ]
            },
            {
              id: 122,
              name: '吉林市',
              children: [
                { id: 1629, name: '丰满区', children: null },
                { id: 1630, name: '昌邑区', children: null },
                { id: 1631, name: '桦甸市', children: null },
                { id: 1632, name: '永吉县', children: null },
                { id: 1633, name: '磐石市', children: null },
                { id: 1634, name: '舒兰市', children: null },
                { id: 1635, name: '船营区', children: null },
                { id: 1636, name: '蛟河市', children: null },
                { id: 1637, name: '龙潭区', children: null }
              ]
            },
            {
              id: 123,
              name: '四平市',
              children: [
                { id: 1638, name: '伊通满族自治县', children: null },
                { id: 1639, name: '公主岭市', children: null },
                { id: 1640, name: '双辽市', children: null },
                { id: 1641, name: '梨树县', children: null },
                { id: 1642, name: '铁东区', children: null },
                { id: 1643, name: '铁西区', children: null }
              ]
            },
            {
              id: 124,
              name: '辽源市',
              children: [
                { id: 1644, name: '东丰县', children: null },
                { id: 1645, name: '东辽县', children: null },
                { id: 1646, name: '西安区', children: null },
                { id: 1647, name: '龙山区', children: null }
              ]
            },
            {
              id: 125,
              name: '通化市',
              children: [
                { id: 1648, name: '东昌区', children: null },
                { id: 1649, name: '二道江区', children: null },
                { id: 1650, name: '柳河县', children: null },
                { id: 1651, name: '梅河口市', children: null },
                { id: 1652, name: '辉南县', children: null },
                { id: 1653, name: '通化县', children: null },
                { id: 1654, name: '集安市', children: null }
              ]
            },
            {
              id: 126,
              name: '白山市',
              children: [
                { id: 1655, name: '临江市', children: null },
                { id: 1656, name: '八道江区', children: null },
                { id: 1657, name: '抚松县', children: null },
                { id: 1658, name: '江源区', children: null },
                { id: 1659, name: '长白朝鲜族自治县', children: null },
                { id: 1660, name: '靖宇县', children: null }
              ]
            },
            {
              id: 127,
              name: '松原市',
              children: [
                { id: 1661, name: '干安县', children: null },
                { id: 1662, name: '前郭尔罗斯蒙古族自治县', children: null },
                { id: 1663, name: '宁江区', children: null },
                { id: 1664, name: '扶余县', children: null },
                { id: 1665, name: '长岭县', children: null }
              ]
            },
            {
              id: 128,
              name: '白城市',
              children: [
                { id: 1666, name: '大安市', children: null },
                { id: 1667, name: '洮北区', children: null },
                { id: 1668, name: '洮南市', children: null },
                { id: 1669, name: '通榆县', children: null },
                { id: 1670, name: '镇赉县', children: null }
              ]
            },
            {
              id: 129,
              name: '延边朝鲜族自治州',
              children: [
                { id: 1671, name: '和龙市', children: null },
                { id: 1672, name: '图们市', children: null },
                { id: 1673, name: '安图县', children: null },
                { id: 1674, name: '延吉市', children: null },
                { id: 1675, name: '敦化市', children: null },
                { id: 1676, name: '汪清县', children: null },
                { id: 1677, name: '珲春市', children: null },
                { id: 1678, name: '龙井市', children: null }
              ]
            }
          ]
        },
        {
          id: 8,
          name: '黑龙江省',
          children: [
            {
              id: 130,
              name: '哈尔滨市',
              children: [
                { id: 1679, name: '五常市', children: null },
                { id: 1680, name: '依兰县', children: null },
                { id: 1681, name: '南岗区', children: null },
                { id: 1682, name: '双城市', children: null },
                { id: 1683, name: '呼兰区', children: null },
                { id: 1684, name: '哈尔滨市道里区', children: null },
                { id: 1685, name: '宾县', children: null },
                { id: 1686, name: '尚志市', children: null },
                { id: 1687, name: '巴彦县', children: null },
                { id: 1688, name: '平房区', children: null },
                { id: 1689, name: '延寿县', children: null },
                { id: 1690, name: '方正县', children: null },
                { id: 1691, name: '木兰县', children: null },
                { id: 1692, name: '松北区', children: null },
                { id: 1693, name: '通河县', children: null },
                { id: 1694, name: '道外区', children: null },
                { id: 1695, name: '阿城区', children: null },
                { id: 1696, name: '香坊区', children: null }
              ]
            },
            {
              id: 131,
              name: '齐齐哈尔市',
              children: [
                { id: 1697, name: '依安县', children: null },
                { id: 1698, name: '克东县', children: null },
                { id: 1699, name: '克山县', children: null },
                { id: 1700, name: '富拉尔基区', children: null },
                { id: 1701, name: '富裕县', children: null },
                { id: 1702, name: '建华区', children: null },
                { id: 1703, name: '拜泉县', children: null },
                { id: 1704, name: '昂昂溪区', children: null },
                { id: 1705, name: '梅里斯达斡尔族区', children: null },
                { id: 1706, name: '泰来县', children: null },
                { id: 1707, name: '甘南县', children: null },
                { id: 1708, name: '碾子山区', children: null },
                { id: 1709, name: '讷河市', children: null },
                { id: 1710, name: '铁锋区', children: null },
                { id: 1711, name: '龙江县', children: null },
                { id: 1712, name: '龙沙区', children: null }
              ]
            },
            {
              id: 132,
              name: '鸡西市',
              children: [
                { id: 1713, name: '城子河区', children: null },
                { id: 1714, name: '密山市', children: null },
                { id: 1715, name: '恒山区', children: null },
                { id: 1716, name: '梨树区', children: null },
                { id: 1717, name: '滴道区', children: null },
                { id: 1718, name: '虎林市', children: null },
                { id: 1719, name: '鸡东县', children: null },
                { id: 1720, name: '鸡冠区', children: null },
                { id: 1721, name: '麻山区', children: null }
              ]
            },
            {
              id: 133,
              name: '鹤岗市',
              children: [
                { id: 1722, name: '东山区', children: null },
                { id: 1723, name: '兴安区', children: null },
                { id: 1724, name: '兴山区', children: null },
                { id: 1725, name: '南山区', children: null },
                { id: 1726, name: '向阳区', children: null },
                { id: 1727, name: '工农区', children: null },
                { id: 1728, name: '绥滨县', children: null },
                { id: 1729, name: '萝北县', children: null }
              ]
            },
            {
              id: 134,
              name: '双鸭山市',
              children: [
                { id: 1730, name: '友谊县', children: null },
                { id: 1731, name: '四方台区', children: null },
                { id: 1732, name: '宝山区', children: null },
                { id: 1733, name: '宝清县', children: null },
                { id: 1734, name: '尖山区', children: null },
                { id: 1735, name: '岭东区', children: null },
                { id: 1736, name: '集贤县', children: null },
                { id: 1737, name: '饶河县', children: null }
              ]
            },
            {
              id: 135,
              name: '大庆市',
              children: [
                { id: 1738, name: '大同区', children: null },
                { id: 1739, name: '杜尔伯特蒙古族自治县', children: null },
                { id: 1740, name: '林甸县', children: null },
                { id: 1741, name: '红岗区', children: null },
                { id: 1742, name: '肇州县', children: null },
                { id: 1743, name: '肇源县', children: null },
                { id: 1744, name: '胡路区', children: null },
                { id: 1745, name: '萨尔图区', children: null },
                { id: 1746, name: '龙凤区', children: null }
              ]
            },
            {
              id: 136,
              name: '伊春市',
              children: [
                { id: 1747, name: '上甘岭区', children: null },
                { id: 1748, name: '乌伊岭区', children: null },
                { id: 1749, name: '乌马河区', children: null },
                { id: 1750, name: '五营区', children: null },
                { id: 1751, name: '伊春区', children: null },
                { id: 1752, name: '南岔区', children: null },
                { id: 1753, name: '友好区', children: null },
                { id: 1754, name: '嘉荫县', children: null },
                { id: 1755, name: '带岭区', children: null },
                { id: 1756, name: '新青区', children: null },
                { id: 1757, name: '汤旺河区', children: null },
                { id: 1758, name: '红星区', children: null },
                { id: 1759, name: '美溪区', children: null },
                { id: 1760, name: '翠峦区', children: null },
                { id: 1761, name: '西林区', children: null },
                { id: 1762, name: '金山屯区', children: null },
                { id: 1763, name: '铁力市', children: null }
              ]
            },
            {
              id: 137,
              name: '佳木斯市',
              children: [
                { id: 1764, name: '东风区', children: null },
                { id: 1765, name: '前进区', children: null },
                { id: 1766, name: '同江市', children: null },
                { id: 1767, name: '向阳区', children: null },
                { id: 1768, name: '富锦市', children: null },
                { id: 1769, name: '抚远县', children: null },
                { id: 1770, name: '桦南县', children: null },
                { id: 1771, name: '桦川县', children: null },
                { id: 1772, name: '汤原县', children: null },
                { id: 1773, name: '郊区', children: null }
              ]
            },
            {
              id: 138,
              name: '七台河市',
              children: [
                { id: 1774, name: '勃利县', children: null },
                { id: 1775, name: '新兴区', children: null },
                { id: 1776, name: '桃山区', children: null },
                { id: 1777, name: '茄子河区', children: null }
              ]
            },
            {
              id: 139,
              name: '牡丹江市',
              children: [
                { id: 1778, name: '东宁县', children: null },
                { id: 1779, name: '东安区', children: null },
                { id: 1780, name: '宁安市', children: null },
                { id: 1781, name: '林口县', children: null },
                { id: 1782, name: '海林市', children: null },
                { id: 1783, name: '爱民区', children: null },
                { id: 1784, name: '穆棱市', children: null },
                { id: 1785, name: '绥芬河市', children: null },
                { id: 1786, name: '西安区', children: null },
                { id: 1787, name: '阳明区', children: null }
              ]
            },
            {
              id: 140,
              name: '黑河市',
              children: [
                { id: 1792, name: '爱辉区', children: null },
                { id: 1793, name: '车逊克县', children: null },
                { id: 1794, name: '逊克县', children: null },
                { id: 1788, name: '五大连池市', children: null },
                { id: 1789, name: '北安市', children: null },
                { id: 1790, name: '嫩江县', children: null },
                { id: 1791, name: '孙吴县', children: null }
              ]
            },
            {
              id: 141,
              name: '绥化市',
              children: [
                { id: 1795, name: '兰西县', children: null },
                { id: 1796, name: '安达市', children: null },
                { id: 1797, name: '庆安县', children: null },
                { id: 1798, name: '明水县', children: null },
                { id: 1799, name: '望奎县', children: null },
                { id: 1800, name: '海伦市', children: null },
                { id: 1801, name: '绥化市北林区', children: null },
                { id: 1802, name: '绥棱县', children: null },
                { id: 1803, name: '肇东市', children: null },
                { id: 1804, name: '青冈县', children: null }
              ]
            },
            {
              id: 142,
              name: '大兴安岭地区',
              children: [
                { id: 1805, name: '呼玛县', children: null },
                { id: 1806, name: '塔河县', children: null },
                { id: 1807, name: '大兴安岭地区加格达奇区', children: null },
                { id: 1808, name: '大兴安岭地区呼中区', children: null },
                { id: 1809, name: '大兴安岭地区新林区', children: null },
                { id: 1810, name: '大兴安岭地区松岭区', children: null },
                { id: 1811, name: '漠河县', children: null }
              ]
            }
          ]
        },
        {
          id: 9,
          name: '上海市',
          children: [
            {
              id: 45055,
              name: '上海市',
              children: [
                { id: 143, name: '黄浦区', children: null },
                { id: 144, name: '卢湾区', children: null },
                { id: 145, name: '徐汇区', children: null },
                { id: 146, name: '长宁区', children: null },
                { id: 147, name: '静安区', children: null },
                { id: 148, name: '普陀区', children: null },
                { id: 149, name: '闸北区', children: null },
                { id: 150, name: '虹口区', children: null },
                { id: 151, name: '杨浦区', children: null },
                { id: 152, name: '闵行区', children: null },
                { id: 153, name: '宝山区', children: null },
                { id: 154, name: '嘉定区', children: null },
                { id: 155, name: '浦东新区', children: null },
                { id: 156, name: '金山区', children: null },
                { id: 157, name: '松江区', children: null },
                { id: 158, name: '青浦区', children: null },
                { id: 159, name: '南汇区', children: null },
                { id: 160, name: '奉贤区', children: null },
                { id: 161, name: '崇明县', children: null }
              ]
            }
          ]
        },
        {
          id: 10,
          name: '江苏省',
          children: [
            {
              id: 162,
              name: '南京市',
              children: [
                { id: 2027, name: '下关区', children: null },
                { id: 2028, name: '六合区', children: null },
                { id: 2029, name: '建邺区', children: null },
                { id: 2030, name: '栖霞区', children: null },
                { id: 2031, name: '江宁区', children: null },
                { id: 2032, name: '浦口区', children: null },
                { id: 2033, name: '溧水县', children: null },
                { id: 2034, name: '玄武区', children: null },
                { id: 2035, name: '白下区', children: null },
                { id: 2036, name: '秦淮区', children: null },
                { id: 2037, name: '雨花台区', children: null },
                { id: 2038, name: '高淳县', children: null },
                { id: 2039, name: '鼓楼区', children: null }
              ]
            },
            {
              id: 163,
              name: '无锡市',
              children: [
                { id: 2040, name: '北塘区', children: null },
                { id: 2041, name: '南长区', children: null },
                { id: 2042, name: '宜兴市', children: null },
                { id: 2043, name: '崇安区', children: null },
                { id: 2044, name: '惠山区', children: null },
                { id: 2045, name: '江阴市', children: null },
                { id: 2046, name: '滨湖区', children: null },
                { id: 2047, name: '锡山区', children: null }
              ]
            },
            {
              id: 164,
              name: '徐州市',
              children: [
                { id: 2048, name: '丰县', children: null },
                { id: 2049, name: '九里区', children: null },
                { id: 2050, name: '云龙区', children: null },
                { id: 2051, name: '新沂市', children: null },
                { id: 2052, name: '沛县', children: null },
                { id: 2053, name: '泉山区', children: null },
                { id: 2054, name: '睢宁县', children: null },
                { id: 2055, name: '贾汪区', children: null },
                { id: 2056, name: '邳州市', children: null },
                { id: 2057, name: '铜山县', children: null },
                { id: 2058, name: '鼓楼区', children: null }
              ]
            },
            {
              id: 165,
              name: '常州市',
              children: [
                { id: 2059, name: '天宁区', children: null },
                { id: 2060, name: '戚墅堰区', children: null },
                { id: 2061, name: '新北区', children: null },
                { id: 2062, name: '武进区', children: null },
                { id: 2063, name: '溧阳市', children: null },
                { id: 2064, name: '金坛市', children: null },
                { id: 2065, name: '钟楼区', children: null }
              ]
            },
            {
              id: 166,
              name: '苏州市',
              children: [
                { id: 2066, name: '吴中区', children: null },
                { id: 2067, name: '吴江市', children: null },
                { id: 2068, name: '太仓市', children: null },
                { id: 2069, name: '常熟市', children: null },
                { id: 2070, name: '平江区', children: null },
                { id: 2071, name: '张家港市', children: null },
                { id: 2072, name: '昆山市', children: null },
                { id: 2073, name: '沧浪区', children: null },
                { id: 2074, name: '相城区', children: null },
                { id: 2075, name: '苏州工业园区', children: null },
                { id: 2076, name: '虎丘区', children: null },
                { id: 2077, name: '金阊区', children: null }
              ]
            },
            {
              id: 167,
              name: '南通市',
              children: [
                { id: 2078, name: '启东市', children: null },
                { id: 2079, name: '如东县', children: null },
                { id: 2080, name: '如皋市', children: null },
                { id: 2081, name: '崇川区', children: null },
                { id: 2082, name: '海安县', children: null },
                { id: 2083, name: '海门市', children: null },
                { id: 2084, name: '港闸区', children: null },
                { id: 2085, name: '通州市', children: null }
              ]
            },
            {
              id: 168,
              name: '连云港市',
              children: [
                { id: 2086, name: '东海县', children: null },
                { id: 2087, name: '新浦区', children: null },
                { id: 2088, name: '海州区', children: null },
                { id: 2089, name: '灌云县', children: null },
                { id: 2090, name: '灌南县', children: null },
                { id: 2091, name: '赣榆县', children: null },
                { id: 2092, name: '连云区', children: null }
              ]
            },
            {
              id: 169,
              name: '淮安市',
              children: [
                { id: 2093, name: '楚州区', children: null },
                { id: 2094, name: '洪泽县', children: null },
                { id: 2095, name: '涟水县', children: null },
                { id: 2096, name: '淮阴区', children: null },
                { id: 2097, name: '清河区', children: null },
                { id: 2098, name: '清浦区', children: null },
                { id: 2099, name: '盱眙县', children: null },
                { id: 2100, name: '金湖县', children: null }
              ]
            },
            {
              id: 170,
              name: '盐城市',
              children: [
                { id: 2101, name: '东台市', children: null },
                { id: 2102, name: '亭湖区', children: null },
                { id: 2103, name: '响水县', children: null },
                { id: 2104, name: '大丰市', children: null },
                { id: 2105, name: '射阳县', children: null },
                { id: 2106, name: '建湖县', children: null },
                { id: 2107, name: '滨海县', children: null },
                { id: 2108, name: '盐都区', children: null },
                { id: 2109, name: '阜宁县', children: null }
              ]
            },
            {
              id: 171,
              name: '扬州市',
              children: [
                { id: 2110, name: '仪征市', children: null },
                { id: 2111, name: '宝应县', children: null },
                { id: 2112, name: '广陵区', children: null },
                { id: 2113, name: '江都市', children: null },
                { id: 2114, name: '维扬区', children: null },
                { id: 2115, name: '邗江区', children: null },
                { id: 2116, name: '高邮市', children: null }
              ]
            },
            {
              id: 172,
              name: '镇江市',
              children: [
                { id: 2117, name: '丹徒区', children: null },
                { id: 2118, name: '丹阳市', children: null },
                { id: 2119, name: '京口区', children: null },
                { id: 2120, name: '句容市', children: null },
                { id: 2121, name: '扬中市', children: null },
                { id: 2122, name: '润州区', children: null }
              ]
            },
            {
              id: 173,
              name: '泰州市',
              children: [
                { id: 2123, name: '兴化市', children: null },
                { id: 2124, name: '姜堰市', children: null },
                { id: 2125, name: '泰兴市', children: null },
                { id: 2126, name: '海陵区', children: null },
                { id: 2127, name: '靖江市', children: null },
                { id: 2128, name: '高港区', children: null }
              ]
            },
            {
              id: 174,
              name: '宿迁市',
              children: [
                { id: 2129, name: '宿城区', children: null },
                { id: 2130, name: '宿豫区', children: null },
                { id: 2131, name: '沭阳县', children: null },
                { id: 2132, name: '泗洪县', children: null },
                { id: 2133, name: '泗阳县', children: null }
              ]
            }
          ]
        },
        {
          id: 11,
          name: '浙江省',
          children: [
            {
              id: 175,
              name: '杭州市',
              children: [
                { id: 2134, name: '上城区', children: null },
                { id: 2135, name: '下城区', children: null },
                { id: 2136, name: '临安市', children: null },
                { id: 2137, name: '余杭区', children: null },
                { id: 2138, name: '富阳市', children: null },
                { id: 2139, name: '建德市', children: null },
                { id: 2140, name: '拱墅区', children: null },
                { id: 2141, name: '桐庐县', children: null },
                { id: 2142, name: '江干区', children: null },
                { id: 2143, name: '淳安县', children: null },
                { id: 2144, name: '滨江区', children: null },
                { id: 2145, name: '萧山区', children: null },
                { id: 2146, name: '西湖区', children: null }
              ]
            },
            {
              id: 176,
              name: '宁波市',
              children: [
                { id: 2147, name: '余姚市', children: null },
                { id: 2148, name: '北仑区', children: null },
                { id: 2149, name: '奉化市', children: null },
                { id: 2150, name: '宁海县', children: null },
                { id: 2151, name: '慈溪市', children: null },
                { id: 2152, name: '江东区', children: null },
                { id: 2153, name: '江北区', children: null },
                { id: 2154, name: '海曙区', children: null },
                { id: 2155, name: '象山县', children: null },
                { id: 2156, name: '鄞州区', children: null },
                { id: 2157, name: '镇海区', children: null }
              ]
            },
            {
              id: 177,
              name: '温州市',
              children: [
                { id: 2158, name: '乐清市', children: null },
                { id: 2159, name: '平阳县', children: null },
                { id: 2160, name: '文成县', children: null },
                { id: 2161, name: '永嘉县', children: null },
                { id: 2162, name: '泰顺县', children: null },
                { id: 2163, name: '洞头县', children: null },
                { id: 2164, name: '瑞安市', children: null },
                { id: 2165, name: '瓯海区', children: null },
                { id: 2166, name: '苍南县', children: null },
                { id: 2167, name: '鹿城区', children: null },
                { id: 2168, name: '龙湾区', children: null }
              ]
            },
            {
              id: 178,
              name: '嘉兴市',
              children: [
                { id: 2169, name: '南湖区', children: null },
                { id: 2170, name: '嘉善县', children: null },
                { id: 2171, name: '平湖市', children: null },
                { id: 2172, name: '桐乡市', children: null },
                { id: 2173, name: '海宁市', children: null },
                { id: 2174, name: '海盐县', children: null },
                { id: 2175, name: '秀洲区', children: null }
              ]
            },
            {
              id: 179,
              name: '湖州市',
              children: [
                { id: 2176, name: '南浔区', children: null },
                { id: 2177, name: '吴兴区', children: null },
                { id: 2178, name: '安吉县', children: null },
                { id: 2179, name: '德清县', children: null },
                { id: 2180, name: '长兴县', children: null }
              ]
            },
            {
              id: 180,
              name: '绍兴市',
              children: [
                { id: 2181, name: '上虞市', children: null },
                { id: 2182, name: '嵊州市', children: null },
                { id: 2183, name: '新昌县', children: null },
                { id: 2184, name: '绍兴县', children: null },
                { id: 2185, name: '诸暨市', children: null },
                { id: 2186, name: '越城区', children: null }
              ]
            },
            {
              id: 181,
              name: '舟山市',
              children: [
                { id: 2187, name: '定海区', children: null },
                { id: 2188, name: '岱山县', children: null },
                { id: 2189, name: '嵊泗县', children: null },
                { id: 2190, name: '普陀区', children: null }
              ]
            },
            {
              id: 182,
              name: '衢州市',
              children: [
                { id: 2191, name: '常山县', children: null },
                { id: 2192, name: '开化县', children: null },
                { id: 2193, name: '柯城区', children: null },
                { id: 2194, name: '江山市', children: null },
                { id: 2195, name: '衢江区', children: null },
                { id: 2196, name: '龙游县', children: null }
              ]
            },
            {
              id: 183,
              name: '金华市',
              children: [
                { id: 2197, name: '东阳市', children: null },
                { id: 2198, name: '义乌市', children: null },
                { id: 2199, name: '兰溪市', children: null },
                { id: 2200, name: '婺城区', children: null },
                { id: 2201, name: '武义县', children: null },
                { id: 2202, name: '永康市', children: null },
                { id: 2203, name: '浦江县', children: null },
                { id: 2204, name: '磐安县', children: null },
                { id: 2205, name: '金东区', children: null }
              ]
            },
            {
              id: 184,
              name: '台州市',
              children: [
                { id: 2206, name: '三门县', children: null },
                { id: 2207, name: '临海市', children: null },
                { id: 2208, name: '仙居县', children: null },
                { id: 2209, name: '天台县', children: null },
                { id: 2210, name: '椒江区', children: null },
                { id: 2211, name: '温岭市', children: null },
                { id: 2212, name: '玉环县', children: null },
                { id: 2213, name: '路桥区', children: null },
                { id: 2214, name: '黄岩区', children: null }
              ]
            },
            {
              id: 185,
              name: '丽水市',
              children: [
                { id: 2215, name: '云和县', children: null },
                { id: 2216, name: '庆元县', children: null },
                { id: 2217, name: '景宁畲族自治县', children: null },
                { id: 2218, name: '松阳县', children: null },
                { id: 2219, name: '缙云县', children: null },
                { id: 2220, name: '莲都区', children: null },
                { id: 2221, name: '遂昌县', children: null },
                { id: 2222, name: '青田县', children: null },
                { id: 2223, name: '龙泉市', children: null }
              ]
            }
          ]
        },
        {
          id: 12,
          name: '安徽省',
          children: [
            {
              id: 186,
              name: '合肥市',
              children: [
                { id: 2224, name: '包河区', children: null },
                { id: 2225, name: '庐阳区', children: null },
                { id: 2226, name: '瑶海区', children: null },
                { id: 2227, name: '肥东县', children: null },
                { id: 2228, name: '肥西县', children: null },
                { id: 2229, name: '蜀山区', children: null },
                { id: 2230, name: '长丰县', children: null }
              ]
            },
            {
              id: 187,
              name: '芜湖市',
              children: [
                { id: 2231, name: '三山区', children: null },
                { id: 2232, name: '南陵县', children: null },
                { id: 2233, name: '弋江区', children: null },
                { id: 2234, name: '繁昌县', children: null },
                { id: 2235, name: '芜湖县', children: null },
                { id: 2236, name: '镜湖区', children: null },
                { id: 2237, name: '鸠江区', children: null }
              ]
            },
            {
              id: 188,
              name: '蚌埠市',
              children: [
                { id: 2238, name: '五河县', children: null },
                { id: 2239, name: '固镇县', children: null },
                { id: 2240, name: '怀远县', children: null },
                { id: 2241, name: '淮上区', children: null },
                { id: 2242, name: '禹会区', children: null },
                { id: 2243, name: '蚌山区', children: null },
                { id: 2244, name: '龙子湖区', children: null }
              ]
            },
            {
              id: 189,
              name: '淮南市',
              children: [
                { id: 2245, name: '八公山区', children: null },
                { id: 2246, name: '凤台县', children: null },
                { id: 2247, name: '大通区', children: null },
                { id: 2248, name: '潘集区', children: null },
                { id: 2249, name: '田家庵区', children: null },
                { id: 2250, name: '谢家集区', children: null }
              ]
            },
            {
              id: 190,
              name: '马鞍山市',
              children: [
                { id: 2251, name: '当涂县', children: null },
                { id: 2252, name: '花山区', children: null },
                { id: 2253, name: '金家庄区', children: null },
                { id: 2254, name: '雨山区', children: null }
              ]
            },
            {
              id: 191,
              name: '淮北市',
              children: [
                { id: 2255, name: '杜集区', children: null },
                { id: 2256, name: '濉溪县', children: null },
                { id: 2257, name: '烈山区', children: null },
                { id: 2258, name: '相山区', children: null }
              ]
            },
            {
              id: 192,
              name: '铜陵市',
              children: [
                { id: 2259, name: '狮子山区', children: null },
                { id: 2260, name: '郊区', children: null },
                { id: 2261, name: '铜官山区', children: null },
                { id: 2262, name: '铜陵县', children: null }
              ]
            },
            {
              id: 193,
              name: '安庆市',
              children: [
                { id: 2263, name: '大观区', children: null },
                { id: 2264, name: '太湖县', children: null },
                { id: 2265, name: '宜秀区', children: null },
                { id: 2266, name: '宿松县', children: null },
                { id: 2267, name: '岳西县', children: null },
                { id: 2268, name: '怀宁县', children: null },
                { id: 2269, name: '望江县', children: null },
                { id: 2270, name: '枞阳县', children: null },
                { id: 2271, name: '桐城市', children: null },
                { id: 2272, name: '潜山县', children: null },
                { id: 2273, name: '迎江区', children: null }
              ]
            },
            {
              id: 194,
              name: '黄山市',
              children: [
                { id: 2274, name: '休宁县', children: null },
                { id: 2275, name: '屯溪区', children: null },
                { id: 2276, name: '徽州区', children: null },
                { id: 2277, name: '歙县', children: null },
                { id: 2278, name: '祁门县', children: null },
                { id: 2279, name: '黄山区', children: null },
                { id: 2280, name: '黟县', children: null }
              ]
            },
            {
              id: 195,
              name: '滁州市',
              children: [
                { id: 2281, name: '全椒县', children: null },
                { id: 2282, name: '凤阳县', children: null },
                { id: 2283, name: '南谯区', children: null },
                { id: 2284, name: '天长市', children: null },
                { id: 2285, name: '定远县', children: null },
                { id: 2286, name: '明光市', children: null },
                { id: 2287, name: '来安县', children: null },
                { id: 2288, name: '琅玡区', children: null }
              ]
            },
            {
              id: 196,
              name: '阜阳市',
              children: [
                { id: 2289, name: '临泉县', children: null },
                { id: 2290, name: '太和县', children: null },
                { id: 2291, name: '界首市', children: null },
                { id: 2292, name: '阜南县', children: null },
                { id: 2293, name: '颍东区', children: null },
                { id: 2294, name: '颍州区', children: null },
                { id: 2295, name: '颍泉区', children: null },
                { id: 2296, name: '颖上县', children: null }
              ]
            },
            {
              id: 197,
              name: '宿州市',
              children: [
                { id: 2297, name: '埇桥区', children: null },
                { id: 2298, name: '泗县辖', children: null },
                { id: 2299, name: '灵璧县', children: null },
                { id: 2300, name: '砀山县', children: null },
                { id: 2301, name: '萧县', children: null }
              ]
            },
            {
              id: 198,
              name: '巢湖市',
              children: [
                { id: 2304, name: '居巢区', children: null },
                { id: 2305, name: '庐江县', children: null },
                { id: 2306, name: '无为县', children: null },
                { id: 2302, name: '含山县', children: null },
                { id: 2303, name: '和县', children: null }
              ]
            },
            {
              id: 199,
              name: '六安市',
              children: [
                { id: 2307, name: '寿县', children: null },
                { id: 2308, name: '舒城县', children: null },
                { id: 2309, name: '裕安区', children: null },
                { id: 2310, name: '金安区', children: null },
                { id: 2311, name: '金寨县', children: null },
                { id: 2312, name: '霍山县', children: null },
                { id: 2313, name: '霍邱县', children: null }
              ]
            },
            {
              id: 200,
              name: '亳州市',
              children: [
                { id: 2314, name: '利辛县', children: null },
                { id: 2315, name: '涡阳县', children: null },
                { id: 2316, name: '蒙城县', children: null },
                { id: 2317, name: '谯城区', children: null }
              ]
            },
            {
              id: 201,
              name: '池州市',
              children: [
                { id: 2318, name: '东至县', children: null },
                { id: 2319, name: '石台县', children: null },
                { id: 2320, name: '贵池区', children: null },
                { id: 2321, name: '青阳县', children: null }
              ]
            },
            {
              id: 202,
              name: '宣城市',
              children: [
                { id: 2322, name: '宁国市', children: null },
                { id: 2323, name: '宣州区', children: null },
                { id: 2324, name: '广德县', children: null },
                { id: 2325, name: '旌德县', children: null },
                { id: 2326, name: '泾县', children: null },
                { id: 2327, name: '绩溪县', children: null },
                { id: 2328, name: '郎溪县', children: null }
              ]
            }
          ]
        },
        {
          id: 13,
          name: '福建省',
          children: [
            {
              id: 203,
              name: '福州市',
              children: [
                { id: 2329, name: '仓山区', children: null },
                { id: 2330, name: '台江区', children: null },
                { id: 2331, name: '平潭县', children: null },
                { id: 2332, name: '晋安区', children: null },
                { id: 2333, name: '永泰县', children: null },
                { id: 2334, name: '福清市', children: null },
                { id: 2335, name: '罗源县', children: null },
                { id: 2336, name: '连江县', children: null },
                { id: 2337, name: '长乐市', children: null },
                { id: 2338, name: '闽侯县', children: null },
                { id: 2339, name: '闽清县', children: null },
                { id: 2340, name: '马尾区', children: null },
                { id: 2341, name: '鼓楼区', children: null }
              ]
            },
            {
              id: 204,
              name: '厦门市',
              children: [
                { id: 2342, name: '同安区', children: null },
                { id: 2343, name: '思明区', children: null },
                { id: 2344, name: '海沧区', children: null },
                { id: 2345, name: '湖里区', children: null },
                { id: 2346, name: '翔安区', children: null },
                { id: 2347, name: '集美区', children: null }
              ]
            },
            {
              id: 205,
              name: '莆田市',
              children: [
                { id: 2348, name: '仙游县', children: null },
                { id: 2349, name: '城厢区', children: null },
                { id: 2350, name: '涵江区', children: null },
                { id: 2351, name: '秀屿区', children: null },
                { id: 2352, name: '荔城区', children: null }
              ]
            },
            {
              id: 206,
              name: '三明市',
              children: [
                { id: 2353, name: '三元区', children: null },
                { id: 2354, name: '大田县', children: null },
                { id: 2355, name: '宁化县', children: null },
                { id: 2356, name: '将乐县', children: null },
                { id: 2357, name: '尤溪县', children: null },
                { id: 2358, name: '建宁县', children: null },
                { id: 2359, name: '明溪县', children: null },
                { id: 2360, name: '梅列区', children: null },
                { id: 2361, name: '永安市', children: null },
                { id: 2362, name: '沙县', children: null },
                { id: 2363, name: '泰宁县', children: null },
                { id: 2364, name: '清流县', children: null }
              ]
            },
            {
              id: 207,
              name: '泉州市',
              children: [
                { id: 2365, name: '丰泽区', children: null },
                { id: 2366, name: '南安市', children: null },
                { id: 2367, name: '安溪县', children: null },
                { id: 2368, name: '德化县', children: null },
                { id: 2369, name: '惠安县', children: null },
                { id: 2370, name: '晋江市', children: null },
                { id: 2371, name: '永春县', children: null },
                { id: 2372, name: '泉港区', children: null },
                { id: 2373, name: '洛江区', children: null },
                { id: 2374, name: '石狮市', children: null },
                { id: 2375, name: '金门县', children: null },
                { id: 2376, name: '鲤城区', children: null }
              ]
            },
            {
              id: 208,
              name: '漳州市',
              children: [
                { id: 2377, name: '东山县', children: null },
                { id: 2378, name: '云霄县', children: null },
                { id: 2379, name: '华安县', children: null },
                { id: 2380, name: '南靖县', children: null },
                { id: 2381, name: '平和县', children: null },
                { id: 2382, name: '漳浦县', children: null },
                { id: 2383, name: '芗城区', children: null },
                { id: 2384, name: '诏安县', children: null },
                { id: 2385, name: '长泰县', children: null },
                { id: 2386, name: '龙文区', children: null },
                { id: 2387, name: '龙海市', children: null }
              ]
            },
            {
              id: 209,
              name: '南平市',
              children: [
                { id: 2388, name: '光泽县', children: null },
                { id: 2389, name: '延平区', children: null },
                { id: 2390, name: '建瓯市', children: null },
                { id: 2391, name: '建阳市', children: null },
                { id: 2392, name: '政和县', children: null },
                { id: 2393, name: '松溪县', children: null },
                { id: 2394, name: '武夷山市', children: null },
                { id: 2395, name: '浦城县', children: null },
                { id: 2396, name: '邵武市', children: null },
                { id: 2397, name: '顺昌县', children: null }
              ]
            },
            {
              id: 210,
              name: '龙岩市',
              children: [
                { id: 2398, name: '上杭县', children: null },
                { id: 2399, name: '新罗区', children: null },
                { id: 2400, name: '武平县', children: null },
                { id: 2401, name: '永定县', children: null },
                { id: 2402, name: '漳平市', children: null },
                { id: 2403, name: '连城县', children: null },
                { id: 2404, name: '长汀县', children: null }
              ]
            },
            {
              id: 211,
              name: '宁德市',
              children: [
                { id: 2405, name: '古田县', children: null },
                { id: 2406, name: '周宁县', children: null },
                { id: 2407, name: '寿宁县', children: null },
                { id: 2408, name: '屏南县', children: null },
                { id: 2409, name: '柘荣县', children: null },
                { id: 2410, name: '福安市', children: null },
                { id: 2411, name: '福鼎市', children: null },
                { id: 2412, name: '蕉城区', children: null },
                { id: 2413, name: '霞浦县', children: null }
              ]
            }
          ]
        },
        {
          id: 14,
          name: '江西省',
          children: [
            {
              id: 212,
              name: '南昌市',
              children: [
                { id: 2414, name: '东湖区', children: null },
                { id: 2415, name: '南昌县', children: null },
                { id: 2416, name: '安义县', children: null },
                { id: 2417, name: '新建县', children: null },
                { id: 2418, name: '湾里区', children: null },
                { id: 2419, name: '西湖区', children: null },
                { id: 2420, name: '进贤县', children: null },
                { id: 2421, name: '青云谱区', children: null },
                { id: 2422, name: '青山湖区', children: null }
              ]
            },
            {
              id: 213,
              name: '景德镇市',
              children: [
                { id: 2423, name: '乐平市', children: null },
                { id: 2424, name: '昌江区', children: null },
                { id: 2425, name: '浮梁县', children: null },
                { id: 2426, name: '珠山区', children: null }
              ]
            },
            {
              id: 214,
              name: '萍乡市',
              children: [
                { id: 2427, name: '上栗县', children: null },
                { id: 2428, name: '安源区', children: null },
                { id: 2429, name: '湘东区', children: null },
                { id: 2430, name: '芦溪县', children: null },
                { id: 2431, name: '莲花县', children: null }
              ]
            },
            {
              id: 215,
              name: '九江市',
              children: [
                { id: 2432, name: '九江县', children: null },
                { id: 2433, name: '修水县', children: null },
                { id: 2434, name: '庐山区', children: null },
                { id: 2435, name: '彭泽县', children: null },
                { id: 2436, name: '德安县', children: null },
                { id: 2437, name: '星子县', children: null },
                { id: 2438, name: '武宁县', children: null },
                { id: 2439, name: '永修县', children: null },
                { id: 2440, name: '浔阳区', children: null },
                { id: 2441, name: '湖口县', children: null },
                { id: 2442, name: '瑞昌市', children: null },
                { id: 2443, name: '都昌县', children: null }
              ]
            },
            {
              id: 216,
              name: '新余市',
              children: [
                { id: 2444, name: '分宜县', children: null },
                { id: 2445, name: '渝水区', children: null }
              ]
            },
            {
              id: 217,
              name: '鹰潭市',
              children: [
                { id: 2446, name: '余江县', children: null },
                { id: 2447, name: '月湖区', children: null },
                { id: 2448, name: '贵溪市', children: null }
              ]
            },
            {
              id: 218,
              name: '赣州市',
              children: [
                { id: 2449, name: '上犹县', children: null },
                { id: 2450, name: '于都县', children: null },
                { id: 2451, name: '会昌县', children: null },
                { id: 2452, name: '信丰县', children: null },
                { id: 2453, name: '全南县', children: null },
                { id: 2454, name: '兴国县', children: null },
                { id: 2455, name: '南康市', children: null },
                { id: 2456, name: '大余县', children: null },
                { id: 2457, name: '宁都县', children: null },
                { id: 2458, name: '安远县', children: null },
                { id: 2459, name: '定南县', children: null },
                { id: 2460, name: '寻乌县', children: null },
                { id: 2461, name: '崇义县', children: null },
                { id: 2462, name: '瑞金市', children: null },
                { id: 2463, name: '石城县', children: null },
                { id: 2464, name: '章贡区', children: null },
                { id: 2465, name: '赣县', children: null },
                { id: 2466, name: '龙南县', children: null }
              ]
            },
            {
              id: 219,
              name: '吉安市',
              children: [
                { id: 2467, name: '万安县', children: null },
                { id: 2468, name: '井冈山市', children: null },
                { id: 2469, name: '吉安县', children: null },
                { id: 2470, name: '吉州区', children: null },
                { id: 2471, name: '吉水县', children: null },
                { id: 2472, name: '安福县', children: null },
                { id: 2473, name: '峡江县', children: null },
                { id: 2474, name: '新干县', children: null },
                { id: 2475, name: '永丰县', children: null },
                { id: 2476, name: '永新县', children: null },
                { id: 2477, name: '泰和县', children: null },
                { id: 2478, name: '遂川县', children: null },
                { id: 2479, name: '青原区', children: null }
              ]
            },
            {
              id: 220,
              name: '宜春市',
              children: [
                { id: 2480, name: '万载县', children: null },
                { id: 2481, name: '上高县', children: null },
                { id: 2482, name: '丰城市', children: null },
                { id: 2483, name: '奉新县', children: null },
                { id: 2484, name: '宜丰县', children: null },
                { id: 2485, name: '樟树市', children: null },
                { id: 2486, name: '袁州区', children: null },
                { id: 2487, name: '铜鼓县', children: null },
                { id: 2488, name: '靖安县', children: null },
                { id: 2489, name: '高安市', children: null }
              ]
            },
            {
              id: 221,
              name: '抚州市',
              children: [
                { id: 2490, name: '东乡县', children: null },
                { id: 2491, name: '临川区', children: null },
                { id: 2492, name: '乐安县', children: null },
                { id: 2493, name: '南丰县', children: null },
                { id: 2494, name: '南城县', children: null },
                { id: 2495, name: '宜黄县', children: null },
                { id: 2496, name: '崇仁县', children: null },
                { id: 2497, name: '广昌县', children: null },
                { id: 2498, name: '资溪县', children: null },
                { id: 2499, name: '金溪县', children: null },
                { id: 2500, name: '黎川县', children: null }
              ]
            },
            {
              id: 222,
              name: '上饶市',
              children: [
                { id: 2501, name: '万年县', children: null },
                { id: 2502, name: '上饶县', children: null },
                { id: 2503, name: '余干县', children: null },
                { id: 2504, name: '信州区', children: null },
                { id: 2505, name: '婺源县', children: null },
                { id: 2506, name: '广丰县', children: null },
                { id: 2507, name: '弋阳县', children: null },
                { id: 2508, name: '德兴市', children: null },
                { id: 2509, name: '横峰县', children: null },
                { id: 2510, name: '玉山县', children: null },
                { id: 2511, name: '鄱阳县', children: null },
                { id: 2512, name: '铅山县', children: null }
              ]
            }
          ]
        },
        {
          id: 15,
          name: '山东省',
          children: [
            {
              id: 223,
              name: '济南市',
              children: [
                { id: 2513, name: '历下区', children: null },
                { id: 2514, name: '历城区', children: null },
                { id: 2515, name: '商河县', children: null },
                { id: 2516, name: '天桥区', children: null },
                { id: 2517, name: '市中区', children: null },
                { id: 2518, name: '平阴县', children: null },
                { id: 2519, name: '槐荫区', children: null },
                { id: 2520, name: '济阳县', children: null },
                { id: 2521, name: '章丘市', children: null },
                { id: 2522, name: '长清区', children: null }
              ]
            },
            {
              id: 224,
              name: '青岛市',
              children: [
                { id: 2523, name: '即墨市', children: null },
                { id: 2524, name: '四方区', children: null },
                { id: 2525, name: '城阳区', children: null },
                { id: 2526, name: '崂山区', children: null },
                { id: 2527, name: '市北区', children: null },
                { id: 2528, name: '市南区', children: null },
                { id: 2529, name: '平度市', children: null },
                { id: 2530, name: '李沧区', children: null },
                { id: 2531, name: '胶南市', children: null },
                { id: 2532, name: '胶州市', children: null },
                { id: 2533, name: '莱西市', children: null },
                { id: 2534, name: '黄岛区', children: null }
              ]
            },
            {
              id: 225,
              name: '淄博市',
              children: [
                { id: 2535, name: '临淄区', children: null },
                { id: 2536, name: '博山区', children: null },
                { id: 2537, name: '周村区', children: null },
                { id: 2538, name: '张店区', children: null },
                { id: 2539, name: '桓台县', children: null },
                { id: 2540, name: '沂源县', children: null },
                { id: 2541, name: '淄川区', children: null },
                { id: 2542, name: '高青县', children: null }
              ]
            },
            {
              id: 226,
              name: '枣庄市',
              children: [
                { id: 2543, name: '台儿庄区', children: null },
                { id: 2544, name: '山亭区', children: null },
                { id: 2545, name: '峄城区', children: null },
                { id: 2546, name: '市中区', children: null },
                { id: 2547, name: '滕州市', children: null },
                { id: 2548, name: '薛城区', children: null }
              ]
            },
            {
              id: 227,
              name: '东营市',
              children: [
                { id: 2549, name: '东营区', children: null },
                { id: 2550, name: '利津县', children: null },
                { id: 2551, name: '垦利县', children: null },
                { id: 2552, name: '广饶县', children: null },
                { id: 2553, name: '河口区', children: null }
              ]
            },
            {
              id: 228,
              name: '烟台市',
              children: [
                { id: 2560, name: '莱山区', children: null },
                { id: 2561, name: '莱州市', children: null },
                { id: 2562, name: '莱阳市', children: null },
                { id: 2563, name: '蓬莱市', children: null },
                { id: 2564, name: '长岛县', children: null },
                { id: 2565, name: '龙口市', children: null },
                { id: 2554, name: '招远市', children: null },
                { id: 2555, name: '栖霞市', children: null },
                { id: 2556, name: '海阳市', children: null },
                { id: 2557, name: '牟平区', children: null },
                { id: 2558, name: '福山区', children: null },
                { id: 2559, name: '芝罘区', children: null }
              ]
            },
            {
              id: 229,
              name: '潍坊市',
              children: [
                { id: 2566, name: '临朐县', children: null },
                { id: 2567, name: '坊子区', children: null },
                { id: 2568, name: '奎文区', children: null },
                { id: 2569, name: '安丘市', children: null },
                { id: 2570, name: '寒亭区', children: null },
                { id: 2571, name: '寿光市', children: null },
                { id: 2572, name: '昌乐县', children: null },
                { id: 2573, name: '昌邑市', children: null },
                { id: 2574, name: '潍城区', children: null },
                { id: 2575, name: '诸城市', children: null },
                { id: 2576, name: '青州市', children: null },
                { id: 2577, name: '高密市', children: null }
              ]
            },
            {
              id: 230,
              name: '济宁市',
              children: [
                { id: 2578, name: '任城区', children: null },
                { id: 2579, name: '兖州市', children: null },
                { id: 2580, name: '嘉祥县', children: null },
                { id: 2581, name: '市中区', children: null },
                { id: 2582, name: '微山县', children: null },
                { id: 2583, name: '曲阜市', children: null },
                { id: 2584, name: '梁山县', children: null },
                { id: 2585, name: '汶上县', children: null },
                { id: 2586, name: '泗水县', children: null },
                { id: 2587, name: '邹城市', children: null },
                { id: 2588, name: '金乡县', children: null },
                { id: 2589, name: '鱼台县', children: null }
              ]
            },
            {
              id: 231,
              name: '泰安市',
              children: [
                { id: 2590, name: '东平县', children: null },
                { id: 2591, name: '宁阳县', children: null },
                { id: 2592, name: '岱岳区', children: null },
                { id: 2593, name: '新泰市', children: null },
                { id: 2594, name: '泰山区', children: null },
                { id: 2595, name: '肥城市', children: null }
              ]
            },
            {
              id: 232,
              name: '威海市',
              children: [
                { id: 2596, name: '乳山市', children: null },
                { id: 2597, name: '文登市', children: null },
                { id: 2598, name: '环翠区', children: null },
                { id: 2599, name: '荣成市', children: null }
              ]
            },
            {
              id: 233,
              name: '日照市',
              children: [
                { id: 2600, name: '东港区', children: null },
                { id: 2601, name: '五莲县', children: null },
                { id: 2602, name: '岚山区', children: null },
                { id: 2603, name: '莒县', children: null }
              ]
            },
            {
              id: 234,
              name: '莱芜市',
              children: [
                { id: 2604, name: '莱城区', children: null },
                { id: 2605, name: '钢城区', children: null }
              ]
            },
            {
              id: 235,
              name: '临沂市',
              children: [
                { id: 2606, name: '临沭县', children: null },
                { id: 2607, name: '兰山区', children: null },
                { id: 2608, name: '平邑县', children: null },
                { id: 2609, name: '沂南县', children: null },
                { id: 2610, name: '沂水县', children: null },
                { id: 2611, name: '河东区', children: null },
                { id: 2612, name: '罗庄区', children: null },
                { id: 2613, name: '苍山县', children: null },
                { id: 2614, name: '莒南县', children: null },
                { id: 2615, name: '蒙阴县', children: null },
                { id: 2616, name: '费县', children: null },
                { id: 2617, name: '郯城县', children: null }
              ]
            },
            {
              id: 236,
              name: '德州市',
              children: [
                { id: 2618, name: '临邑县', children: null },
                { id: 2619, name: '乐陵市', children: null },
                { id: 2620, name: '夏津县', children: null },
                { id: 2621, name: '宁津县', children: null },
                { id: 2622, name: '平原县', children: null },
                { id: 2623, name: '庆云县', children: null },
                { id: 2624, name: '德城区', children: null },
                { id: 2625, name: '武城县', children: null },
                { id: 2626, name: '禹城市', children: null },
                { id: 2627, name: '陵县', children: null },
                { id: 2628, name: '齐河县', children: null }
              ]
            },
            {
              id: 237,
              name: '聊城市',
              children: [
                { id: 2629, name: '东昌府区', children: null },
                { id: 2630, name: '东阿县', children: null },
                { id: 2631, name: '临清市', children: null },
                { id: 2632, name: '冠县', children: null },
                { id: 2633, name: '茌平县', children: null },
                { id: 2634, name: '莘县', children: null },
                { id: 2635, name: '阳谷县', children: null },
                { id: 2636, name: '高唐县', children: null }
              ]
            },
            {
              id: 238,
              name: '滨州市',
              children: [
                { id: 2637, name: '博兴县', children: null },
                { id: 2638, name: '惠民县', children: null },
                { id: 2639, name: '无棣县', children: null },
                { id: 2640, name: '沾化县', children: null },
                { id: 2641, name: '滨城区', children: null },
                { id: 2642, name: '邹平县', children: null },
                { id: 2643, name: '阳信县', children: null }
              ]
            },
            {
              id: 239,
              name: '菏泽市',
              children: [
                { id: 2644, name: '东明县', children: null },
                { id: 2645, name: '单县', children: null },
                { id: 2646, name: '定陶县', children: null },
                { id: 2647, name: '巨野县', children: null },
                { id: 2648, name: '成武县', children: null },
                { id: 2649, name: '曹县', children: null },
                { id: 2650, name: '牡丹区', children: null },
                { id: 2651, name: '郓城县', children: null },
                { id: 2652, name: '鄄城县', children: null }
              ]
            }
          ]
        },
        {
          id: 16,
          name: '河南省',
          children: [
            {
              id: 256,
              name: '驻马店市',
              children: [
                { id: 2801, name: '上蔡县', children: null },
                { id: 2802, name: '平舆县', children: null },
                { id: 2803, name: '新蔡县', children: null },
                { id: 2804, name: '正阳县', children: null },
                { id: 2805, name: '汝南县', children: null },
                { id: 2806, name: '泌阳县', children: null },
                { id: 2807, name: '确山县', children: null },
                { id: 2808, name: '西平县', children: null },
                { id: 2809, name: '遂平县', children: null },
                { id: 2810, name: '驿城区', children: null }
              ]
            },
            { id: 257, name: '济源市', children: [{ id: 2811, name: '济源市', children: null }] },
            {
              id: 240,
              name: '郑州市',
              children: [
                { id: 2653, name: '上街区', children: null },
                { id: 2654, name: '中原区', children: null },
                { id: 2655, name: '中牟县', children: null },
                { id: 2656, name: '二七区', children: null },
                { id: 2657, name: '巩义市', children: null },
                { id: 2658, name: '惠济区', children: null },
                { id: 2659, name: '新密市', children: null },
                { id: 2660, name: '新郑市', children: null },
                { id: 2661, name: '登封市', children: null },
                { id: 2662, name: '管城回族区', children: null },
                { id: 2663, name: '荥阳市', children: null },
                { id: 2664, name: '金水区', children: null }
              ]
            },
            {
              id: 241,
              name: '开封市',
              children: [
                { id: 2665, name: '兰考县', children: null },
                { id: 2666, name: '尉氏县', children: null },
                { id: 2667, name: '开封县', children: null },
                { id: 2668, name: '杞县', children: null },
                { id: 2669, name: '禹王台区', children: null },
                { id: 2670, name: '通许县', children: null },
                { id: 2671, name: '金明区', children: null },
                { id: 2672, name: '顺河回族区', children: null },
                { id: 2673, name: '鼓楼区', children: null },
                { id: 2674, name: '龙亭区', children: null }
              ]
            },
            {
              id: 242,
              name: '洛阳市',
              children: [
                { id: 2675, name: '伊川县', children: null },
                { id: 2676, name: '偃师市', children: null },
                { id: 2677, name: '吉利区', children: null },
                { id: 2678, name: '孟津县', children: null },
                { id: 2679, name: '宜阳县', children: null },
                { id: 2680, name: '嵩县', children: null },
                { id: 2681, name: '新安县', children: null },
                { id: 2682, name: '栾川县', children: null },
                { id: 2683, name: '汝阳县', children: null },
                { id: 2684, name: '洛宁县', children: null },
                { id: 2685, name: '洛龙区', children: null },
                { id: 2686, name: '涧西区', children: null },
                { id: 2687, name: '瀍河回族区', children: null },
                { id: 2688, name: '老城区', children: null },
                { id: 2689, name: '西工区', children: null }
              ]
            },
            {
              id: 243,
              name: '平顶山市',
              children: [
                { id: 2690, name: '卫东区', children: null },
                { id: 2691, name: '叶县', children: null },
                { id: 2692, name: '宝丰县', children: null },
                { id: 2693, name: '新华区', children: null },
                { id: 2694, name: '汝州市', children: null },
                { id: 2695, name: '湛河区', children: null },
                { id: 2696, name: '石龙区', children: null },
                { id: 2697, name: '舞钢市', children: null },
                { id: 2698, name: '郏县', children: null },
                { id: 2699, name: '鲁山县', children: null }
              ]
            },
            {
              id: 244,
              name: '安阳市',
              children: [
                { id: 2700, name: '内黄县', children: null },
                { id: 2701, name: '北关区', children: null },
                { id: 2702, name: '安阳县', children: null },
                { id: 2703, name: '文峰区', children: null },
                { id: 2704, name: '林州市', children: null },
                { id: 2705, name: '殷都区', children: null },
                { id: 2706, name: '汤阴县', children: null },
                { id: 2707, name: '滑县', children: null },
                { id: 2708, name: '龙安区', children: null }
              ]
            },
            {
              id: 245,
              name: '鹤壁市',
              children: [
                { id: 2709, name: '山城区', children: null },
                { id: 2710, name: '浚县', children: null },
                { id: 2711, name: '淇县', children: null },
                { id: 2712, name: '淇滨区', children: null },
                { id: 2713, name: '鹤山区', children: null }
              ]
            },
            {
              id: 246,
              name: '新乡市',
              children: [
                { id: 2714, name: '凤泉区', children: null },
                { id: 2715, name: '卫滨区', children: null },
                { id: 2716, name: '卫辉市', children: null },
                { id: 2717, name: '原阳县', children: null },
                { id: 2718, name: '封丘县', children: null },
                { id: 2719, name: '延津县', children: null },
                { id: 2720, name: '新乡县', children: null },
                { id: 2721, name: '牧野区', children: null },
                { id: 2722, name: '红旗区', children: null },
                { id: 2723, name: '获嘉县', children: null },
                { id: 2724, name: '辉县市', children: null },
                { id: 2725, name: '长垣县', children: null }
              ]
            },
            {
              id: 247,
              name: '焦作市',
              children: [
                { id: 2726, name: '中站区', children: null },
                { id: 2727, name: '修武县', children: null },
                { id: 2728, name: '博爱县', children: null },
                { id: 2729, name: '孟州市', children: null },
                { id: 2730, name: '山阳区', children: null },
                { id: 2731, name: '武陟县', children: null },
                { id: 2732, name: '沁阳市', children: null },
                { id: 2733, name: '温县', children: null },
                { id: 2734, name: '解放区', children: null },
                { id: 2735, name: '马村区', children: null }
              ]
            },
            {
              id: 248,
              name: '濮阳市',
              children: [
                { id: 2736, name: '华龙区', children: null },
                { id: 2737, name: '南乐县', children: null },
                { id: 2738, name: '台前县', children: null },
                { id: 2739, name: '清丰县', children: null },
                { id: 2740, name: '濮阳县', children: null },
                { id: 2741, name: '范县', children: null }
              ]
            },
            {
              id: 249,
              name: '许昌市',
              children: [
                { id: 2742, name: '禹州市', children: null },
                { id: 2743, name: '襄城县', children: null },
                { id: 2744, name: '许昌县', children: null },
                { id: 2745, name: '鄢陵县', children: null },
                { id: 2746, name: '长葛市', children: null },
                { id: 2747, name: '魏都区', children: null }
              ]
            },
            {
              id: 250,
              name: '漯河市',
              children: [
                { id: 2748, name: '临颍县', children: null },
                { id: 2749, name: '召陵区', children: null },
                { id: 2750, name: '源汇区', children: null },
                { id: 2751, name: '舞阳县', children: null },
                { id: 2752, name: '郾城区', children: null }
              ]
            },
            {
              id: 251,
              name: '三门峡市',
              children: [
                { id: 2753, name: '义马市', children: null },
                { id: 2754, name: '卢氏县', children: null },
                { id: 2755, name: '渑池县', children: null },
                { id: 2756, name: '湖滨区', children: null },
                { id: 2757, name: '灵宝市', children: null },
                { id: 2758, name: '陕县', children: null }
              ]
            },
            {
              id: 252,
              name: '南阳市',
              children: [
                { id: 2759, name: '内乡县', children: null },
                { id: 2760, name: '南召县', children: null },
                { id: 2761, name: '卧龙区', children: null },
                { id: 2762, name: '唐河县', children: null },
                { id: 2763, name: '宛城区', children: null },
                { id: 2764, name: '新野县', children: null },
                { id: 2765, name: '方城县', children: null },
                { id: 2766, name: '桐柏县', children: null },
                { id: 2767, name: '淅川县', children: null },
                { id: 2768, name: '社旗县', children: null },
                { id: 2769, name: '西峡县', children: null },
                { id: 2770, name: '邓州市', children: null },
                { id: 2771, name: '镇平县', children: null }
              ]
            },
            {
              id: 253,
              name: '商丘市',
              children: [
                { id: 2772, name: '夏邑县', children: null },
                { id: 2773, name: '宁陵县', children: null },
                { id: 2774, name: '柘城县', children: null },
                { id: 2775, name: '民权县', children: null },
                { id: 2776, name: '永城市', children: null },
                { id: 2777, name: '睢县', children: null },
                { id: 2778, name: '睢阳区', children: null },
                { id: 2779, name: '粱园区', children: null },
                { id: 2780, name: '虞城县', children: null }
              ]
            },
            {
              id: 254,
              name: '信阳市',
              children: [
                { id: 2781, name: '光山县', children: null },
                { id: 2782, name: '商城县', children: null },
                { id: 2783, name: '固始县', children: null },
                { id: 2784, name: '平桥区', children: null },
                { id: 2785, name: '息县', children: null },
                { id: 2786, name: '新县', children: null },
                { id: 2787, name: '浉河区', children: null },
                { id: 2788, name: '淮滨县', children: null },
                { id: 2789, name: '潢川县', children: null },
                { id: 2790, name: '罗山县', children: null }
              ]
            },
            {
              id: 255,
              name: '周口市',
              children: [
                { id: 2791, name: '商水县', children: null },
                { id: 2792, name: '太康县', children: null },
                { id: 2793, name: '川汇区', children: null },
                { id: 2794, name: '扶沟县', children: null },
                { id: 2795, name: '沈丘县', children: null },
                { id: 2796, name: '淮阳县', children: null },
                { id: 2797, name: '西华县', children: null },
                { id: 2798, name: '郸城县', children: null },
                { id: 2799, name: '项城市', children: null },
                { id: 2800, name: '鹿邑县', children: null }
              ]
            }
          ]
        },
        {
          id: 17,
          name: '湖北省',
          children: [
            {
              id: 258,
              name: '武汉市',
              children: [
                { id: 2816, name: '汉阳区', children: null },
                { id: 2817, name: '江夏区', children: null },
                { id: 2818, name: '江岸区', children: null },
                { id: 2819, name: '江汉区', children: null },
                { id: 2820, name: '洪山区', children: null },
                { id: 2821, name: '硚口区', children: null },
                { id: 2822, name: '蔡甸区', children: null },
                { id: 2823, name: '青山区', children: null },
                { id: 2824, name: '黄陂区', children: null },
                { id: 2812, name: '东西湖区', children: null },
                { id: 2813, name: '新洲区', children: null },
                { id: 2814, name: '武昌区', children: null },
                { id: 2815, name: '汉南区', children: null }
              ]
            },
            {
              id: 259,
              name: '黄石市',
              children: [
                { id: 2825, name: '下陆区', children: null },
                { id: 2826, name: '大冶市', children: null },
                { id: 2827, name: '西塞山区', children: null },
                { id: 2828, name: '铁山区', children: null },
                { id: 2829, name: '阳新县', children: null },
                { id: 2830, name: '黄石港区', children: null }
              ]
            },
            {
              id: 260,
              name: '十堰市',
              children: [
                { id: 2831, name: '丹江口市', children: null },
                { id: 2832, name: '张湾区', children: null },
                { id: 2833, name: '房县', children: null },
                { id: 2834, name: '竹山县', children: null },
                { id: 2835, name: '竹溪县', children: null },
                { id: 2836, name: '茅箭区', children: null },
                { id: 2837, name: '郧县', children: null },
                { id: 2838, name: '郧西县', children: null }
              ]
            },
            {
              id: 261,
              name: '宜昌市',
              children: [
                { id: 2839, name: '五峰土家族自治县', children: null },
                { id: 2840, name: '伍家岗区', children: null },
                { id: 2841, name: '兴山县', children: null },
                { id: 2842, name: '夷陵区', children: null },
                { id: 2843, name: '宜都市', children: null },
                { id: 2844, name: '当阳市', children: null },
                { id: 2845, name: '枝江市', children: null },
                { id: 2846, name: '点军区', children: null },
                { id: 2847, name: '秭归县', children: null },
                { id: 2848, name: '虢亭区', children: null },
                { id: 2849, name: '西陵区', children: null },
                { id: 2850, name: '远安县', children: null },
                { id: 2851, name: '长阳土家族自治县', children: null }
              ]
            },
            {
              id: 262,
              name: '襄樊市',
              children: [
                { id: 2852, name: '保康县', children: null },
                { id: 2853, name: '南漳县', children: null },
                { id: 2854, name: '宜城市', children: null },
                { id: 2855, name: '枣阳市', children: null },
                { id: 2856, name: '樊城区', children: null },
                { id: 2857, name: '老河口市', children: null },
                { id: 2858, name: '襄城区', children: null },
                { id: 2859, name: '襄阳区', children: null },
                { id: 2860, name: '谷城县', children: null }
              ]
            },
            {
              id: 263,
              name: '鄂州市',
              children: [
                { id: 2861, name: '华容区', children: null },
                { id: 2862, name: '粱子湖', children: null },
                { id: 2863, name: '鄂城区', children: null }
              ]
            },
            {
              id: 264,
              name: '荆门市',
              children: [
                { id: 2864, name: '东宝区', children: null },
                { id: 2865, name: '京山县', children: null },
                { id: 2866, name: '掇刀区', children: null },
                { id: 2867, name: '沙洋县', children: null },
                { id: 2868, name: '钟祥市', children: null }
              ]
            },
            {
              id: 265,
              name: '孝感市',
              children: [
                { id: 2869, name: '云梦县', children: null },
                { id: 2870, name: '大悟县', children: null },
                { id: 2871, name: '孝南区', children: null },
                { id: 2872, name: '孝昌县', children: null },
                { id: 2873, name: '安陆市', children: null },
                { id: 2874, name: '应城市', children: null },
                { id: 2875, name: '汉川市', children: null }
              ]
            },
            {
              id: 266,
              name: '荆州市',
              children: [
                { id: 2876, name: '公安县', children: null },
                { id: 2877, name: '松滋市', children: null },
                { id: 2878, name: '江陵县', children: null },
                { id: 2879, name: '沙市区', children: null },
                { id: 2880, name: '洪湖市', children: null },
                { id: 2881, name: '监利县', children: null },
                { id: 2882, name: '石首市', children: null },
                { id: 2883, name: '荆州区', children: null }
              ]
            },
            {
              id: 267,
              name: '黄冈市',
              children: [
                { id: 2884, name: '团风县', children: null },
                { id: 2885, name: '武穴市', children: null },
                { id: 2886, name: '浠水县', children: null },
                { id: 2887, name: '红安县', children: null },
                { id: 2888, name: '罗田县', children: null },
                { id: 2889, name: '英山县', children: null },
                { id: 2890, name: '蕲春县', children: null },
                { id: 2891, name: '麻城市', children: null },
                { id: 2892, name: '黄州区', children: null },
                { id: 2893, name: '黄梅县', children: null }
              ]
            },
            {
              id: 268,
              name: '咸宁市',
              children: [
                { id: 2894, name: '咸安区', children: null },
                { id: 2895, name: '嘉鱼县', children: null },
                { id: 2896, name: '崇阳县', children: null },
                { id: 2897, name: '赤壁市', children: null },
                { id: 2898, name: '通城县', children: null },
                { id: 2899, name: '通山县', children: null }
              ]
            },
            {
              id: 269,
              name: '随州市',
              children: [
                { id: 2900, name: '广水市', children: null },
                { id: 2901, name: '曾都区', children: null }
              ]
            },
            {
              id: 270,
              name: '恩施土家族苗族自治州',
              children: [
                { id: 2902, name: '利川市', children: null },
                { id: 2903, name: '咸丰县', children: null },
                { id: 2904, name: '宣恩县', children: null },
                { id: 2905, name: '巴东县', children: null },
                { id: 2906, name: '建始县', children: null },
                { id: 2907, name: '恩施市', children: null },
                { id: 2908, name: '来凤县', children: null },
                { id: 2909, name: '鹤峰县', children: null }
              ]
            },
            { id: 271, name: '仙桃市', children: [{ id: 2910, name: '仙桃市', children: null }] },
            { id: 272, name: '潜江市', children: [{ id: 2911, name: '潜江市', children: null }] },
            { id: 273, name: '天门市', children: [{ id: 2912, name: '天门市', children: null }] },
            {
              id: 274,
              name: '神农架林区',
              children: [{ id: 2913, name: '神农架林区', children: null }]
            }
          ]
        },
        {
          id: 18,
          name: '湖南省',
          children: [
            {
              id: 275,
              name: '长沙市',
              children: [
                { id: 2914, name: '天心区', children: null },
                { id: 2915, name: '宁乡县', children: null },
                { id: 2916, name: '岳麓区', children: null },
                { id: 2917, name: '开福区', children: null },
                { id: 2918, name: '望城县', children: null },
                { id: 2919, name: '浏阳市', children: null },
                { id: 2920, name: '芙蓉区', children: null },
                { id: 2921, name: '长沙县', children: null },
                { id: 2922, name: '雨花区', children: null }
              ]
            },
            {
              id: 276,
              name: '株洲市',
              children: [
                { id: 2923, name: '天元区', children: null },
                { id: 2924, name: '攸县', children: null },
                { id: 2925, name: '株洲县', children: null },
                { id: 2926, name: '炎陵县', children: null },
                { id: 2927, name: '石峰区', children: null },
                { id: 2928, name: '芦淞区', children: null },
                { id: 2929, name: '茶陵县', children: null },
                { id: 2930, name: '荷塘区', children: null },
                { id: 2931, name: '醴陵市', children: null }
              ]
            },
            {
              id: 277,
              name: '湘潭市',
              children: [
                { id: 2932, name: '岳塘区', children: null },
                { id: 2933, name: '湘乡市', children: null },
                { id: 2934, name: '湘潭县', children: null },
                { id: 2935, name: '雨湖区', children: null },
                { id: 2936, name: '韶山市', children: null }
              ]
            },
            {
              id: 278,
              name: '衡阳市',
              children: [
                { id: 2937, name: '南岳区', children: null },
                { id: 2938, name: '常宁市', children: null },
                { id: 2939, name: '珠晖区', children: null },
                { id: 2940, name: '石鼓区', children: null },
                { id: 2941, name: '祁东县', children: null },
                { id: 2942, name: '耒阳市', children: null },
                { id: 2943, name: '蒸湘区', children: null },
                { id: 2944, name: '衡东县', children: null },
                { id: 2945, name: '衡南县', children: null },
                { id: 2946, name: '衡山县', children: null },
                { id: 2947, name: '衡阳县', children: null },
                { id: 2948, name: '雁峰区', children: null }
              ]
            },
            {
              id: 279,
              name: '邵阳市',
              children: [
                { id: 2949, name: '北塔区', children: null },
                { id: 2950, name: '双清区', children: null },
                { id: 2951, name: '城步苗族自治县', children: null },
                { id: 2952, name: '大祥区', children: null },
                { id: 2953, name: '新宁县', children: null },
                { id: 2954, name: '新邵县', children: null },
                { id: 2955, name: '武冈市', children: null },
                { id: 2956, name: '洞口县', children: null },
                { id: 2957, name: '绥宁县', children: null },
                { id: 2958, name: '邵东县', children: null },
                { id: 2959, name: '邵阳县', children: null },
                { id: 2960, name: '隆回县', children: null }
              ]
            },
            {
              id: 280,
              name: '岳阳市',
              children: [
                { id: 2961, name: '临湘市', children: null },
                { id: 2962, name: '云溪区', children: null },
                { id: 2963, name: '华容县', children: null },
                { id: 2964, name: '君山区', children: null },
                { id: 2965, name: '岳阳县', children: null },
                { id: 2966, name: '岳阳楼区', children: null },
                { id: 2967, name: '平江县', children: null },
                { id: 2968, name: '汨罗市', children: null },
                { id: 2969, name: '湘阴县', children: null }
              ]
            },
            {
              id: 281,
              name: '常德市',
              children: [
                { id: 2970, name: '临澧县', children: null },
                { id: 2971, name: '安乡县', children: null },
                { id: 2972, name: '桃源县', children: null },
                { id: 2973, name: '武陵区', children: null },
                { id: 2974, name: '汉寿县', children: null },
                { id: 2975, name: '津市市', children: null },
                { id: 2976, name: '澧县', children: null },
                { id: 2977, name: '石门县', children: null },
                { id: 2978, name: '鼎城区', children: null }
              ]
            },
            {
              id: 282,
              name: '张家界市',
              children: [
                { id: 2979, name: '慈利县', children: null },
                { id: 2980, name: '桑植县', children: null },
                { id: 2981, name: '武陵源区', children: null },
                { id: 2982, name: '永定区', children: null }
              ]
            },
            {
              id: 283,
              name: '益阳市',
              children: [
                { id: 2983, name: '南县', children: null },
                { id: 2984, name: '安化县', children: null },
                { id: 2985, name: '桃江县', children: null },
                { id: 2986, name: '沅江市', children: null },
                { id: 2987, name: '资阳区', children: null },
                { id: 2988, name: '赫山区', children: null }
              ]
            },
            {
              id: 284,
              name: '郴州市',
              children: [
                { id: 2989, name: '临武县', children: null },
                { id: 2990, name: '北湖区', children: null },
                { id: 2991, name: '嘉禾县', children: null },
                { id: 2992, name: '安仁县', children: null },
                { id: 2993, name: '宜章县', children: null },
                { id: 2994, name: '桂东县', children: null },
                { id: 2995, name: '桂阳县', children: null },
                { id: 2996, name: '永兴县', children: null },
                { id: 2997, name: '汝城县', children: null },
                { id: 2998, name: '苏仙区', children: null },
                { id: 2999, name: '资兴市', children: null }
              ]
            },
            {
              id: 285,
              name: '永州市',
              children: [
                { id: 3000, name: '东安县', children: null },
                { id: 3001, name: '冷水滩区', children: null },
                { id: 3002, name: '双牌县', children: null },
                { id: 3003, name: '宁远县', children: null },
                { id: 3004, name: '新田县', children: null },
                { id: 3005, name: '江华瑶族自治县', children: null },
                { id: 3006, name: '江永县', children: null },
                { id: 3007, name: '祁阳县', children: null },
                { id: 3008, name: '蓝山县', children: null },
                { id: 3009, name: '道县', children: null },
                { id: 3010, name: '零陵区', children: null }
              ]
            },
            {
              id: 286,
              name: '怀化市',
              children: [
                { id: 3011, name: '中方县', children: null },
                { id: 3012, name: '会同县', children: null },
                { id: 3013, name: '新晃侗族自治县', children: null },
                { id: 3014, name: '沅陵县', children: null },
                { id: 3015, name: '洪江市/洪江区', children: null },
                { id: 3016, name: '溆浦县', children: null },
                { id: 3017, name: '芷江侗族自治县', children: null },
                { id: 3018, name: '辰溪县', children: null },
                { id: 3019, name: '通道侗族自治县', children: null },
                { id: 3020, name: '靖州苗族侗族自治县', children: null },
                { id: 3021, name: '鹤城区', children: null },
                { id: 3022, name: '麻阳苗族自治县', children: null }
              ]
            },
            {
              id: 287,
              name: '娄底市',
              children: [
                { id: 3023, name: '冷水江市', children: null },
                { id: 3024, name: '双峰县', children: null },
                { id: 3025, name: '娄星区', children: null },
                { id: 3026, name: '新化县', children: null },
                { id: 3027, name: '涟源市', children: null }
              ]
            },
            {
              id: 288,
              name: '湘西土家族苗族自治州',
              children: [
                { id: 3028, name: '保靖县', children: null },
                { id: 3029, name: '凤凰县', children: null },
                { id: 3030, name: '古丈县', children: null },
                { id: 3031, name: '吉首市', children: null },
                { id: 3032, name: '永顺县', children: null },
                { id: 3033, name: '泸溪县', children: null },
                { id: 3034, name: '花垣县', children: null },
                { id: 3035, name: '龙山县', children: null }
              ]
            }
          ]
        },
        {
          id: 19,
          name: '广东省',
          children: [
            {
              id: 289,
              name: '广州市',
              children: [
                { id: 3036, name: '萝岗区', children: null },
                { id: 3037, name: '南沙区', children: null },
                { id: 3038, name: '从化市', children: null },
                { id: 3039, name: '增城市', children: null },
                { id: 3040, name: '天河区', children: null },
                { id: 3041, name: '海珠区', children: null },
                { id: 3042, name: '番禺区', children: null },
                { id: 3043, name: '白云区', children: null },
                { id: 3044, name: '花都区', children: null },
                { id: 3045, name: '荔湾区', children: null },
                { id: 3046, name: '越秀区', children: null },
                { id: 3047, name: '黄埔区', children: null }
              ]
            },
            {
              id: 290,
              name: '韶关市',
              children: [
                { id: 3048, name: '乐昌市', children: null },
                { id: 3049, name: '乳源瑶族自治县', children: null },
                { id: 3050, name: '仁化县', children: null },
                { id: 3051, name: '南雄市', children: null },
                { id: 3052, name: '始兴县', children: null },
                { id: 3053, name: '新丰县', children: null },
                { id: 3054, name: '曲江区', children: null },
                { id: 3055, name: '武江区', children: null },
                { id: 3056, name: '浈江区', children: null },
                { id: 3057, name: '翁源县', children: null }
              ]
            },
            {
              id: 291,
              name: '深圳市',
              children: [
                { id: 3058, name: '南山区', children: null },
                { id: 3059, name: '宝安区', children: null },
                { id: 3060, name: '盐田区', children: null },
                { id: 3061, name: '福田区', children: null },
                { id: 3062, name: '罗湖区', children: null },
                { id: 3063, name: '龙岗区', children: null }
              ]
            },
            {
              id: 292,
              name: '珠海市',
              children: [
                { id: 3064, name: '斗门区', children: null },
                { id: 3065, name: '金湾区', children: null },
                { id: 3066, name: '香洲区', children: null }
              ]
            },
            {
              id: 293,
              name: '汕头市',
              children: [
                { id: 3072, name: '金平区', children: null },
                { id: 3073, name: '龙湖区', children: null },
                { id: 3067, name: '南澳县', children: null },
                { id: 3068, name: '潮南区', children: null },
                { id: 3069, name: '潮阳区', children: null },
                { id: 3070, name: '澄海区', children: null },
                { id: 3071, name: '濠江区', children: null }
              ]
            },
            {
              id: 294,
              name: '佛山市',
              children: [
                { id: 3074, name: '三水区', children: null },
                { id: 3075, name: '南海区', children: null },
                { id: 3076, name: '禅城区', children: null },
                { id: 3077, name: '顺德区', children: null },
                { id: 3078, name: '高明区', children: null }
              ]
            },
            {
              id: 295,
              name: '江门市',
              children: [
                { id: 3079, name: '台山市', children: null },
                { id: 3080, name: '开平市', children: null },
                { id: 3081, name: '恩平市', children: null },
                { id: 3082, name: '新会区', children: null },
                { id: 3083, name: '江海区', children: null },
                { id: 3084, name: '蓬江区', children: null },
                { id: 3085, name: '鹤山市', children: null }
              ]
            },
            {
              id: 296,
              name: '湛江市',
              children: [
                { id: 3086, name: '吴川市', children: null },
                { id: 3087, name: '坡头区', children: null },
                { id: 3088, name: '廉江市', children: null },
                { id: 3089, name: '徐闻县', children: null },
                { id: 3090, name: '赤坎区', children: null },
                { id: 3091, name: '遂溪县', children: null },
                { id: 3092, name: '雷州市', children: null },
                { id: 3093, name: '霞山区', children: null },
                { id: 3094, name: '麻章区', children: null }
              ]
            },
            {
              id: 297,
              name: '茂名市',
              children: [
                { id: 3095, name: '信宜市', children: null },
                { id: 3096, name: '化州市', children: null },
                { id: 3097, name: '电白县', children: null },
                { id: 3098, name: '茂南区', children: null },
                { id: 3099, name: '茂港区', children: null },
                { id: 3100, name: '高州市', children: null }
              ]
            },
            {
              id: 298,
              name: '肇庆市',
              children: [
                { id: 3101, name: '四会市', children: null },
                { id: 3102, name: '封开县', children: null },
                { id: 3103, name: '广宁县', children: null },
                { id: 3104, name: '德庆县', children: null },
                { id: 3105, name: '怀集县', children: null },
                { id: 3106, name: '端州区', children: null },
                { id: 3107, name: '高要市', children: null },
                { id: 3108, name: '鼎湖区', children: null }
              ]
            },
            {
              id: 299,
              name: '惠州市',
              children: [
                { id: 3109, name: '博罗县', children: null },
                { id: 3110, name: '惠东县', children: null },
                { id: 3111, name: '惠城区', children: null },
                { id: 3112, name: '惠阳区', children: null },
                { id: 3113, name: '龙门县', children: null }
              ]
            },
            {
              id: 300,
              name: '梅州市',
              children: [
                { id: 3114, name: '丰顺县', children: null },
                { id: 3115, name: '五华县', children: null },
                { id: 3116, name: '兴宁市', children: null },
                { id: 3117, name: '大埔县', children: null },
                { id: 3118, name: '平远县', children: null },
                { id: 3119, name: '梅县', children: null },
                { id: 3120, name: '梅江区', children: null },
                { id: 3121, name: '蕉岭县', children: null }
              ]
            },
            {
              id: 301,
              name: '汕尾市',
              children: [
                { id: 3122, name: '城区', children: null },
                { id: 3123, name: '海丰县', children: null },
                { id: 3124, name: '陆丰市', children: null },
                { id: 3125, name: '陆河县', children: null }
              ]
            },
            {
              id: 302,
              name: '河源市',
              children: [
                { id: 3126, name: '东源县', children: null },
                { id: 3127, name: '和平县', children: null },
                { id: 3128, name: '源城区', children: null },
                { id: 3129, name: '紫金县', children: null },
                { id: 3130, name: '连平县', children: null },
                { id: 3131, name: '龙川县', children: null }
              ]
            },
            {
              id: 303,
              name: '阳江市',
              children: [
                { id: 3132, name: '江城区', children: null },
                { id: 3133, name: '阳东县', children: null },
                { id: 3134, name: '阳春市', children: null },
                { id: 3135, name: '阳西县', children: null }
              ]
            },
            {
              id: 304,
              name: '清远市',
              children: [
                { id: 3136, name: '佛冈县', children: null },
                { id: 3137, name: '清城区', children: null },
                { id: 3138, name: '清新县', children: null },
                { id: 3139, name: '英德市', children: null },
                { id: 3140, name: '连南瑶族自治县', children: null },
                { id: 3141, name: '连山壮族瑶族自治县', children: null },
                { id: 3142, name: '连州市', children: null },
                { id: 3143, name: '阳山县', children: null }
              ]
            },
            { id: 305, name: '东莞市', children: [{ id: 3144, name: '东莞市', children: null }] },
            { id: 306, name: '中山市', children: [{ id: 3145, name: '中山市', children: null }] },
            {
              id: 307,
              name: '潮州市',
              children: [
                { id: 3146, name: '湘桥区', children: null },
                { id: 3147, name: '潮安县', children: null },
                { id: 3148, name: '饶平县', children: null }
              ]
            },
            {
              id: 308,
              name: '揭阳市',
              children: [
                { id: 3149, name: '惠来县', children: null },
                { id: 3150, name: '揭东县', children: null },
                { id: 3151, name: '揭西县', children: null },
                { id: 3152, name: '普宁市', children: null },
                { id: 3153, name: '榕城区', children: null }
              ]
            },
            {
              id: 309,
              name: '云浮市',
              children: [
                { id: 3154, name: '云城区', children: null },
                { id: 3155, name: '云安县', children: null },
                { id: 3156, name: '新兴县', children: null },
                { id: 3157, name: '罗定市', children: null },
                { id: 3158, name: '郁南县', children: null }
              ]
            }
          ]
        },
        {
          id: 20,
          name: '广西壮族自治区',
          children: [
            {
              id: 310,
              name: '南宁市',
              children: [
                { id: 3159, name: '上林县', children: null },
                { id: 3160, name: '兴宁区', children: null },
                { id: 3161, name: '宾阳县', children: null },
                { id: 3162, name: '横县', children: null },
                { id: 3163, name: '武鸣县', children: null },
                { id: 3164, name: '江南区', children: null },
                { id: 3165, name: '良庆区', children: null },
                { id: 3166, name: '西乡塘区', children: null },
                { id: 3167, name: '邕宁区', children: null },
                { id: 3168, name: '隆安县', children: null },
                { id: 3169, name: '青秀区', children: null },
                { id: 3170, name: '马山县', children: null }
              ]
            },
            {
              id: 311,
              name: '柳州市',
              children: [
                { id: 3171, name: '三江侗族自治县', children: null },
                { id: 3172, name: '城中区', children: null },
                { id: 3173, name: '柳北区', children: null },
                { id: 3174, name: '柳南区', children: null },
                { id: 3175, name: '柳城县', children: null },
                { id: 3176, name: '柳江县', children: null },
                { id: 3177, name: '融安县', children: null },
                { id: 3178, name: '融水苗族自治县', children: null },
                { id: 3179, name: '鱼峰区', children: null },
                { id: 3180, name: '鹿寨县', children: null }
              ]
            },
            {
              id: 312,
              name: '桂林市',
              children: [
                { id: 3181, name: '七星区', children: null },
                { id: 3182, name: '临桂县', children: null },
                { id: 3183, name: '全州县', children: null },
                { id: 3184, name: '兴安县', children: null },
                { id: 3185, name: '叠彩区', children: null },
                { id: 3186, name: '平乐县', children: null },
                { id: 3187, name: '恭城瑶族自治县', children: null },
                { id: 3188, name: '永福县', children: null },
                { id: 3189, name: '灌阳县', children: null },
                { id: 3190, name: '灵川县', children: null },
                { id: 3191, name: '秀峰区', children: null },
                { id: 3192, name: '荔浦县', children: null },
                { id: 3193, name: '象山区', children: null },
                { id: 3194, name: '资源县', children: null },
                { id: 3195, name: '阳朔县', children: null },
                { id: 3196, name: '雁山区', children: null },
                { id: 3197, name: '龙胜各族自治县', children: null }
              ]
            },
            {
              id: 313,
              name: '梧州市',
              children: [
                { id: 3198, name: '万秀区', children: null },
                { id: 3199, name: '岑溪市', children: null },
                { id: 3200, name: '苍梧县', children: null },
                { id: 3201, name: '蒙山县', children: null },
                { id: 3202, name: '藤县', children: null },
                { id: 3203, name: '蝶山区', children: null },
                { id: 3204, name: '长洲区', children: null }
              ]
            },
            {
              id: 314,
              name: '北海市',
              children: [
                { id: 3205, name: '合浦县', children: null },
                { id: 3206, name: '海城区', children: null },
                { id: 3207, name: '铁山港区', children: null },
                { id: 3208, name: '银海区', children: null }
              ]
            },
            {
              id: 315,
              name: '防城港市',
              children: [
                { id: 3209, name: '上思县', children: null },
                { id: 3210, name: '东兴市', children: null },
                { id: 3211, name: '港口区', children: null },
                { id: 3212, name: '防城区', children: null }
              ]
            },
            {
              id: 316,
              name: '钦州市',
              children: [
                { id: 3213, name: '浦北县', children: null },
                { id: 3214, name: '灵山县', children: null },
                { id: 3215, name: '钦北区', children: null },
                { id: 3216, name: '钦南区', children: null }
              ]
            },
            {
              id: 317,
              name: '贵港市',
              children: [
                { id: 3217, name: '平南县', children: null },
                { id: 3218, name: '桂平市', children: null },
                { id: 3219, name: '港北区', children: null },
                { id: 3220, name: '港南区', children: null },
                { id: 3221, name: '覃塘区', children: null }
              ]
            },
            {
              id: 318,
              name: '玉林市',
              children: [
                { id: 3222, name: '兴业县', children: null },
                { id: 3223, name: '北流市', children: null },
                { id: 3224, name: '博白县', children: null },
                { id: 3225, name: '容县', children: null },
                { id: 3226, name: '玉州区', children: null },
                { id: 3227, name: '陆川县', children: null }
              ]
            },
            {
              id: 319,
              name: '百色市',
              children: [
                { id: 3228, name: '乐业县', children: null },
                { id: 3229, name: '凌云县', children: null },
                { id: 3230, name: '右江区', children: null },
                { id: 3231, name: '平果县', children: null },
                { id: 3232, name: '德保县', children: null },
                { id: 3233, name: '田东县', children: null },
                { id: 3234, name: '田林县', children: null },
                { id: 3235, name: '田阳县', children: null },
                { id: 3236, name: '西林县', children: null },
                { id: 3237, name: '那坡县', children: null },
                { id: 3238, name: '隆林各族自治县', children: null },
                { id: 3239, name: '靖西县', children: null }
              ]
            },
            {
              id: 320,
              name: '贺州市',
              children: [
                { id: 3240, name: '八步区', children: null },
                { id: 3241, name: '富川瑶族自治县', children: null },
                { id: 3242, name: '昭平县', children: null },
                { id: 3243, name: '钟山县', children: null }
              ]
            },
            {
              id: 321,
              name: '河池市',
              children: [
                { id: 3244, name: '东兰县', children: null },
                { id: 3245, name: '凤山县', children: null },
                { id: 3246, name: '南丹县', children: null },
                { id: 3247, name: '大化瑶族自治县', children: null },
                { id: 3248, name: '天峨县', children: null },
                { id: 3249, name: '宜州市', children: null },
                { id: 3250, name: '巴马瑶族自治县', children: null },
                { id: 3251, name: '环江毛南族自治县', children: null },
                { id: 3252, name: '罗城仫佬族自治县', children: null },
                { id: 3253, name: '都安瑶族自治县', children: null },
                { id: 3254, name: '金城江区', children: null }
              ]
            },
            {
              id: 322,
              name: '来宾市',
              children: [
                { id: 3255, name: '兴宾区', children: null },
                { id: 3256, name: '合山市', children: null },
                { id: 3257, name: '忻城县', children: null },
                { id: 3258, name: '武宣县', children: null },
                { id: 3259, name: '象州县', children: null },
                { id: 3260, name: '金秀瑶族自治县', children: null }
              ]
            },
            {
              id: 323,
              name: '崇左市',
              children: [
                { id: 3261, name: '凭祥市', children: null },
                { id: 3262, name: '大新县', children: null },
                { id: 3263, name: '天等县', children: null },
                { id: 3264, name: '宁明县', children: null },
                { id: 3265, name: '扶绥县', children: null },
                { id: 3266, name: '江州区', children: null },
                { id: 3267, name: '龙州县', children: null }
              ]
            }
          ]
        },
        {
          id: 21,
          name: '海南省',
          children: [
            {
              id: 324,
              name: '海口市',
              children: [
                { id: 3268, name: '琼山区', children: null },
                { id: 3269, name: '秀英区', children: null },
                { id: 3270, name: '美兰区', children: null },
                { id: 3271, name: '龙华区', children: null }
              ]
            },
            { id: 325, name: '三亚市', children: [{ id: 3272, name: '三亚市', children: null }] },
            {
              id: 326,
              name: '五指山市',
              children: [{ id: 3273, name: '五指山市', children: null }]
            },
            { id: 327, name: '琼海市', children: [{ id: 3274, name: '琼海市', children: null }] },
            { id: 328, name: '儋州市', children: [{ id: 3275, name: '儋州市', children: null }] },
            { id: 329, name: '文昌市', children: [{ id: 3276, name: '文昌市', children: null }] },
            { id: 330, name: '万宁市', children: [{ id: 3277, name: '万宁市', children: null }] },
            { id: 331, name: '东方市', children: [{ id: 3278, name: '东方市', children: null }] },
            { id: 332, name: '定安县', children: [{ id: 3279, name: '定安县', children: null }] },
            { id: 333, name: '屯昌县', children: [{ id: 3280, name: '屯昌县', children: null }] },
            { id: 334, name: '澄迈县', children: [{ id: 3281, name: '澄迈县', children: null }] },
            { id: 335, name: '临高县', children: [{ id: 3282, name: '临高县', children: null }] },
            {
              id: 336,
              name: '白沙黎族自治县',
              children: [{ id: 3283, name: '白沙黎族自治县', children: null }]
            },
            {
              id: 337,
              name: '昌江黎族自治县',
              children: [{ id: 3284, name: '昌江黎族自治县', children: null }]
            },
            {
              id: 338,
              name: '乐东黎族自治县',
              children: [{ id: 3285, name: '乐东黎族自治县', children: null }]
            },
            {
              id: 339,
              name: '陵水黎族自治县',
              children: [{ id: 3286, name: '陵水黎族自治县', children: null }]
            },
            {
              id: 340,
              name: '保亭黎族苗族自治县',
              children: [{ id: 3287, name: '保亭黎族苗族自治县', children: null }]
            },
            {
              id: 341,
              name: '琼中黎族苗族自治县',
              children: [{ id: 3288, name: '琼中黎族苗族自治县', children: null }]
            },
            { id: 342, name: '西沙群岛', children: [] },
            { id: 343, name: '南沙群岛', children: [] },
            { id: 344, name: '中沙群岛的岛礁及其海域', children: [] }
          ]
        },
        {
          id: 22,
          name: '重庆市',
          children: [
            {
              id: 45056,
              name: '重庆市',
              children: [
                { id: 345, name: '万州区', children: null },
                { id: 346, name: '涪陵区', children: null },
                { id: 347, name: '渝中区', children: null },
                { id: 348, name: '大渡口区', children: null },
                { id: 349, name: '江北区', children: null },
                { id: 350, name: '沙坪坝区', children: null },
                { id: 351, name: '九龙坡区', children: null },
                { id: 352, name: '南岸区', children: null },
                { id: 353, name: '北碚区', children: null },
                { id: 354, name: '双桥区', children: null },
                { id: 355, name: '万盛区', children: null },
                { id: 356, name: '渝北区', children: null },
                { id: 357, name: '巴南区', children: null },
                { id: 358, name: '黔江区', children: null },
                { id: 359, name: '长寿区', children: null },
                { id: 360, name: '綦江县', children: null },
                { id: 361, name: '潼南县', children: null },
                { id: 362, name: '铜梁县', children: null },
                { id: 363, name: '大足县', children: null },
                { id: 364, name: '荣昌县', children: null },
                { id: 365, name: '璧山县', children: null },
                { id: 366, name: '梁平县', children: null },
                { id: 367, name: '城口县', children: null },
                { id: 368, name: '丰都县', children: null },
                { id: 369, name: '垫江县', children: null },
                { id: 370, name: '武隆县', children: null },
                { id: 371, name: '忠县', children: null },
                { id: 372, name: '开县', children: null },
                { id: 373, name: '云阳县', children: null },
                { id: 374, name: '奉节县', children: null },
                { id: 375, name: '巫山县', children: null },
                { id: 376, name: '巫溪县', children: null },
                { id: 377, name: '石柱土家族自治县', children: null },
                { id: 378, name: '秀山土家族苗族自治县', children: null },
                { id: 379, name: '酉阳土家族苗族自治县', children: null },
                { id: 380, name: '彭水苗族土家族自治县', children: null },
                { id: 381, name: '江津市', children: null },
                { id: 382, name: '合川市', children: null },
                { id: 383, name: '永川市', children: null },
                { id: 384, name: '南川市', children: null }
              ]
            }
          ]
        },
        {
          id: 23,
          name: '四川省',
          children: [
            {
              id: 385,
              name: '成都市',
              children: [
                { id: 4209, name: '双流县', children: null },
                { id: 4210, name: '大邑县', children: null },
                { id: 4211, name: '崇州市', children: null },
                { id: 4212, name: '彭州市', children: null },
                { id: 4213, name: '成华区', children: null },
                { id: 4214, name: '新津县', children: null },
                { id: 4215, name: '新都区', children: null },
                { id: 4216, name: '武侯区', children: null },
                { id: 4217, name: '温江区', children: null },
                { id: 4218, name: '蒲江县', children: null },
                { id: 4219, name: '邛崃市', children: null },
                { id: 4220, name: '郫县', children: null },
                { id: 4221, name: '都江堰市', children: null },
                { id: 4222, name: '金堂县', children: null },
                { id: 4223, name: '金牛区', children: null },
                { id: 4224, name: '锦江区', children: null },
                { id: 4225, name: '青白江区', children: null },
                { id: 4226, name: '青羊区', children: null },
                { id: 4227, name: '龙泉驿区', children: null }
              ]
            },
            {
              id: 386,
              name: '自贡市',
              children: [
                { id: 4228, name: '大安区', children: null },
                { id: 4229, name: '富顺县', children: null },
                { id: 4230, name: '沿滩区', children: null },
                { id: 4231, name: '自流井区', children: null },
                { id: 4232, name: '荣县', children: null },
                { id: 4233, name: '贡井区', children: null }
              ]
            },
            {
              id: 387,
              name: '攀枝花市',
              children: [
                { id: 4234, name: '东区', children: null },
                { id: 4235, name: '仁和区', children: null },
                { id: 4236, name: '盐边县', children: null },
                { id: 4237, name: '米易县', children: null },
                { id: 4238, name: '西区', children: null }
              ]
            },
            {
              id: 388,
              name: '泸州市',
              children: [
                { id: 4239, name: '叙永县', children: null },
                { id: 4240, name: '古蔺县', children: null },
                { id: 4241, name: '合江县', children: null },
                { id: 4242, name: '江阳区', children: null },
                { id: 4243, name: '泸县', children: null },
                { id: 4244, name: '纳溪区', children: null },
                { id: 4245, name: '龙马潭区', children: null }
              ]
            },
            {
              id: 389,
              name: '德阳市',
              children: [
                { id: 4246, name: '中江县', children: null },
                { id: 4247, name: '什邡市', children: null },
                { id: 4248, name: '广汉市', children: null },
                { id: 4249, name: '旌阳区', children: null },
                { id: 4250, name: '绵竹市', children: null },
                { id: 4251, name: '罗江县', children: null }
              ]
            },
            {
              id: 390,
              name: '绵阳市',
              children: [
                { id: 4252, name: '三台县', children: null },
                { id: 4253, name: '北川羌族自治县', children: null },
                { id: 4254, name: '安县', children: null },
                { id: 4255, name: '平武县', children: null },
                { id: 4256, name: '梓潼县', children: null },
                { id: 4257, name: '江油市', children: null },
                { id: 4258, name: '涪城区', children: null },
                { id: 4259, name: '游仙区', children: null },
                { id: 4260, name: '盐亭县', children: null }
              ]
            },
            {
              id: 391,
              name: '广元市',
              children: [
                { id: 4261, name: '元坝区', children: null },
                { id: 4262, name: '利州区', children: null },
                { id: 4263, name: '剑阁县', children: null },
                { id: 4264, name: '旺苍县', children: null },
                { id: 4265, name: '朝天区', children: null },
                { id: 4266, name: '苍溪县', children: null },
                { id: 4267, name: '青川县', children: null }
              ]
            },
            {
              id: 392,
              name: '遂宁市',
              children: [
                { id: 4268, name: '大英县', children: null },
                { id: 4269, name: '安居区', children: null },
                { id: 4270, name: '射洪县', children: null },
                { id: 4271, name: '船山区', children: null },
                { id: 4272, name: '蓬溪县', children: null }
              ]
            },
            {
              id: 393,
              name: '内江市',
              children: [
                { id: 4273, name: '东兴区', children: null },
                { id: 4274, name: '威远县', children: null },
                { id: 4275, name: '市中区', children: null },
                { id: 4276, name: '资中县', children: null },
                { id: 4277, name: '隆昌县', children: null }
              ]
            },
            {
              id: 394,
              name: '乐山市',
              children: [
                { id: 4278, name: '五通桥区', children: null },
                { id: 4279, name: '井研县', children: null },
                { id: 4280, name: '夹江县', children: null },
                { id: 4281, name: '峨眉山市', children: null },
                { id: 4282, name: '峨边彝族自治县', children: null },
                { id: 4283, name: '市中区', children: null },
                { id: 4284, name: '沐川县', children: null },
                { id: 4285, name: '沙湾区', children: null },
                { id: 4286, name: '犍为县', children: null },
                { id: 4287, name: '金口河区', children: null },
                { id: 4288, name: '马边彝族自治县', children: null }
              ]
            },
            {
              id: 395,
              name: '南充市',
              children: [
                { id: 4289, name: '仪陇县', children: null },
                { id: 4290, name: '南充市嘉陵区', children: null },
                { id: 4291, name: '南部县', children: null },
                { id: 4292, name: '嘉陵区', children: null },
                { id: 4293, name: '营山县', children: null },
                { id: 4294, name: '蓬安县', children: null },
                { id: 4295, name: '西充县', children: null },
                { id: 4296, name: '阆中市', children: null },
                { id: 4297, name: '顺庆区', children: null },
                { id: 4298, name: '高坪区', children: null }
              ]
            },
            {
              id: 396,
              name: '眉山市',
              children: [
                { id: 4299, name: '东坡区', children: null },
                { id: 4300, name: '丹棱县', children: null },
                { id: 4301, name: '仁寿县', children: null },
                { id: 4302, name: '彭山县', children: null },
                { id: 4303, name: '洪雅县', children: null },
                { id: 4304, name: '青神县', children: null }
              ]
            },
            {
              id: 397,
              name: '宜宾市',
              children: [
                { id: 4305, name: '兴文县', children: null },
                { id: 4306, name: '南溪县', children: null },
                { id: 4307, name: '宜宾县', children: null },
                { id: 4308, name: '屏山县', children: null },
                { id: 4309, name: '江安县', children: null },
                { id: 4310, name: '珙县', children: null },
                { id: 4311, name: '筠连县', children: null },
                { id: 4312, name: '翠屏区', children: null },
                { id: 4313, name: '长宁县', children: null },
                { id: 4314, name: '高县', children: null }
              ]
            },
            {
              id: 398,
              name: '广安市',
              children: [
                { id: 4315, name: '华蓥市', children: null },
                { id: 4316, name: '岳池县', children: null },
                { id: 4317, name: '广安区', children: null },
                { id: 4318, name: '武胜县', children: null },
                { id: 4319, name: '邻水县', children: null }
              ]
            },
            {
              id: 399,
              name: '达州市',
              children: [
                { id: 4320, name: '万源市', children: null },
                { id: 4321, name: '大竹县', children: null },
                { id: 4322, name: '宣汉县', children: null },
                { id: 4323, name: '开江县', children: null },
                { id: 4324, name: '渠县', children: null },
                { id: 4325, name: '达县', children: null },
                { id: 4326, name: '通川区', children: null }
              ]
            },
            {
              id: 400,
              name: '雅安市',
              children: [
                { id: 4327, name: '名山县', children: null },
                { id: 4328, name: '天全县', children: null },
                { id: 4329, name: '宝兴县', children: null },
                { id: 4330, name: '汉源县', children: null },
                { id: 4331, name: '石棉县', children: null },
                { id: 4332, name: '芦山县', children: null },
                { id: 4333, name: '荥经县', children: null },
                { id: 4334, name: '雨城区', children: null }
              ]
            },
            {
              id: 401,
              name: '巴中市',
              children: [
                { id: 4335, name: '南江县', children: null },
                { id: 4336, name: '巴州区', children: null },
                { id: 4337, name: '平昌县', children: null },
                { id: 4338, name: '通江县', children: null }
              ]
            },
            {
              id: 402,
              name: '资阳市',
              children: [
                { id: 4339, name: '乐至县', children: null },
                { id: 4340, name: '安岳县', children: null },
                { id: 4341, name: '简阳市', children: null },
                { id: 4342, name: '雁江区', children: null }
              ]
            },
            {
              id: 403,
              name: '阿坝藏族羌族自治州',
              children: [
                { id: 4352, name: '金川县', children: null },
                { id: 4353, name: '阿坝县', children: null },
                { id: 4354, name: '马尔康县', children: null },
                { id: 4355, name: '黑水县', children: null },
                { id: 4343, name: '九寨沟县', children: null },
                { id: 4344, name: '壤塘县', children: null },
                { id: 4345, name: '小金县', children: null },
                { id: 4346, name: '松潘县', children: null },
                { id: 4347, name: '汶川县', children: null },
                { id: 4348, name: '理县', children: null },
                { id: 4349, name: '红原县', children: null },
                { id: 4350, name: '若尔盖县', children: null },
                { id: 4351, name: '茂县', children: null }
              ]
            },
            {
              id: 404,
              name: '甘孜藏族自治州',
              children: [
                { id: 4356, name: '丹巴县', children: null },
                { id: 4357, name: '乡城县', children: null },
                { id: 4358, name: '巴塘县', children: null },
                { id: 4359, name: '康定县', children: null },
                { id: 4360, name: '得荣县', children: null },
                { id: 4361, name: '德格县', children: null },
                { id: 4362, name: '新龙县', children: null },
                { id: 4363, name: '泸定县', children: null },
                { id: 4364, name: '炉霍县', children: null },
                { id: 4365, name: '理塘县', children: null },
                { id: 4366, name: '甘孜县', children: null },
                { id: 4367, name: '白玉县', children: null },
                { id: 4368, name: '石渠县', children: null },
                { id: 4369, name: '稻城县', children: null },
                { id: 4370, name: '色达县', children: null },
                { id: 4371, name: '道孚县', children: null },
                { id: 4372, name: '雅江县', children: null }
              ]
            },
            {
              id: 405,
              name: '凉山彝族自治州',
              children: [
                { id: 4373, name: '会东县', children: null },
                { id: 4374, name: '会理县', children: null },
                { id: 4375, name: '冕宁县', children: null },
                { id: 4376, name: '喜德县', children: null },
                { id: 4377, name: '宁南县', children: null },
                { id: 4378, name: '布拖县', children: null },
                { id: 4379, name: '德昌县', children: null },
                { id: 4380, name: '昭觉县', children: null },
                { id: 4381, name: '普格县', children: null },
                { id: 4382, name: '木里藏族自治县', children: null },
                { id: 4383, name: '甘洛县', children: null },
                { id: 4384, name: '盐源县', children: null },
                { id: 4385, name: '美姑县', children: null },
                { id: 4386, name: '西昌', children: null },
                { id: 4387, name: '越西县', children: null },
                { id: 4388, name: '金阳县', children: null },
                { id: 4389, name: '雷波县', children: null }
              ]
            }
          ]
        },
        {
          id: 24,
          name: '贵州省',
          children: [
            {
              id: 406,
              name: '贵阳市',
              children: [
                { id: 4390, name: '乌当区', children: null },
                { id: 4391, name: '云岩区', children: null },
                { id: 4392, name: '修文县', children: null },
                { id: 4393, name: '南明区', children: null },
                { id: 4394, name: '小河区', children: null },
                { id: 4395, name: '开阳县', children: null },
                { id: 4396, name: '息烽县', children: null },
                { id: 4397, name: '清镇市', children: null },
                { id: 4398, name: '白云区', children: null },
                { id: 4399, name: '花溪区', children: null }
              ]
            },
            {
              id: 407,
              name: '六盘水市',
              children: [
                { id: 4400, name: '六枝特区', children: null },
                { id: 4401, name: '水城县', children: null },
                { id: 4402, name: '盘县', children: null },
                { id: 4403, name: '钟山区', children: null }
              ]
            },
            {
              id: 408,
              name: '遵义市',
              children: [
                { id: 4404, name: '习水县', children: null },
                { id: 4405, name: '仁怀市', children: null },
                { id: 4406, name: '余庆县', children: null },
                { id: 4407, name: '凤冈县', children: null },
                { id: 4408, name: '务川仡佬族苗族自治县', children: null },
                { id: 4409, name: '桐梓县', children: null },
                { id: 4410, name: '正安县', children: null },
                { id: 4411, name: '汇川区', children: null },
                { id: 4412, name: '湄潭县', children: null },
                { id: 4413, name: '红花岗区', children: null },
                { id: 4414, name: '绥阳县', children: null },
                { id: 4415, name: '赤水市', children: null },
                { id: 4416, name: '道真仡佬族苗族自治县', children: null },
                { id: 4417, name: '遵义县', children: null }
              ]
            },
            {
              id: 409,
              name: '安顺市',
              children: [
                { id: 4418, name: '关岭布依族苗族自治县', children: null },
                { id: 4419, name: '平坝县', children: null },
                { id: 4420, name: '普定县', children: null },
                { id: 4421, name: '紫云苗族布依族自治县', children: null },
                { id: 4422, name: '西秀区', children: null },
                { id: 4423, name: '镇宁布依族苗族自治县', children: null }
              ]
            },
            {
              id: 410,
              name: '铜仁地区',
              children: [
                { id: 4424, name: '万山特区', children: null },
                { id: 4425, name: '印江土家族苗族自治县', children: null },
                { id: 4426, name: '德江县', children: null },
                { id: 4427, name: '思南县', children: null },
                { id: 4428, name: '松桃苗族自治县', children: null },
                { id: 4429, name: '江口县', children: null },
                { id: 4430, name: '沿河土家族自治县', children: null },
                { id: 4431, name: '玉屏侗族自治县', children: null },
                { id: 4432, name: '石阡县', children: null },
                { id: 4433, name: '铜仁市', children: null }
              ]
            },
            {
              id: 411,
              name: '黔西南布依族苗族自治州',
              children: [
                { id: 4434, name: '兴义市', children: null },
                { id: 4435, name: '兴仁县', children: null },
                { id: 4436, name: '册亨县', children: null },
                { id: 4437, name: '安龙县', children: null },
                { id: 4438, name: '普安县', children: null },
                { id: 4439, name: '晴隆县', children: null },
                { id: 4440, name: '望谟县', children: null },
                { id: 4441, name: '贞丰县', children: null }
              ]
            },
            {
              id: 412,
              name: '毕节地区',
              children: [
                { id: 4442, name: '大方县', children: null },
                { id: 4443, name: '威宁彝族回族苗族自治县', children: null },
                { id: 4444, name: '毕节市', children: null },
                { id: 4445, name: '纳雍县', children: null },
                { id: 4446, name: '织金县', children: null },
                { id: 4447, name: '赫章县', children: null },
                { id: 4448, name: '金沙县', children: null },
                { id: 4449, name: '黔西县', children: null }
              ]
            },
            {
              id: 413,
              name: '黔东南苗族侗族自治州',
              children: [
                { id: 4450, name: '三穗县', children: null },
                { id: 4451, name: '丹寨县', children: null },
                { id: 4452, name: '从江县', children: null },
                { id: 4453, name: '凯里市', children: null },
                { id: 4454, name: '剑河县', children: null },
                { id: 4455, name: '台江县', children: null },
                { id: 4456, name: '天柱县', children: null },
                { id: 4457, name: '岑巩县', children: null },
                { id: 4458, name: '施秉县', children: null },
                { id: 4459, name: '榕江县', children: null },
                { id: 4460, name: '锦屏县', children: null },
                { id: 4461, name: '镇远县', children: null },
                { id: 4462, name: '雷山县', children: null },
                { id: 4463, name: '麻江县', children: null },
                { id: 4464, name: '黄平县', children: null },
                { id: 4465, name: '黎平县', children: null }
              ]
            },
            {
              id: 414,
              name: '黔南布依族苗族自治州',
              children: [
                { id: 4466, name: '三都水族自治县', children: null },
                { id: 4467, name: '平塘县', children: null },
                { id: 4468, name: '惠水县', children: null },
                { id: 4469, name: '独山县', children: null },
                { id: 4470, name: '瓮安县', children: null },
                { id: 4471, name: '福泉市', children: null },
                { id: 4472, name: '罗甸县', children: null },
                { id: 4473, name: '荔波县', children: null },
                { id: 4474, name: '贵定县', children: null },
                { id: 4475, name: '都匀市', children: null },
                { id: 4476, name: '长顺县', children: null },
                { id: 4477, name: '龙里县', children: null }
              ]
            }
          ]
        },
        {
          id: 25,
          name: '云南省',
          children: [
            {
              id: 415,
              name: '昆明市',
              children: [
                { id: 4478, name: '东川区', children: null },
                { id: 4479, name: '五华区', children: null },
                { id: 4480, name: '呈贡县', children: null },
                { id: 4481, name: '安宁市', children: null },
                { id: 4482, name: '官渡区', children: null },
                { id: 4483, name: '宜良县', children: null },
                { id: 4484, name: '富民县', children: null },
                { id: 4485, name: '寻甸回族彝族自治县', children: null },
                { id: 4486, name: '嵩明县', children: null },
                { id: 4487, name: '晋宁县', children: null },
                { id: 4488, name: '盘龙区', children: null },
                { id: 4489, name: '石林彝族自治县', children: null },
                { id: 4490, name: '禄劝彝族苗族自治县', children: null },
                { id: 4491, name: '西山区', children: null }
              ]
            },
            {
              id: 416,
              name: '曲靖市',
              children: [
                { id: 4492, name: '会泽县', children: null },
                { id: 4493, name: '宣威市', children: null },
                { id: 4494, name: '富源县', children: null },
                { id: 4495, name: '师宗县', children: null },
                { id: 4496, name: '沾益县', children: null },
                { id: 4497, name: '罗平县', children: null },
                { id: 4498, name: '陆良县', children: null },
                { id: 4499, name: '马龙县', children: null },
                { id: 4500, name: '麒麟区', children: null }
              ]
            },
            {
              id: 417,
              name: '玉溪市',
              children: [
                { id: 4501, name: '元江哈尼族彝族傣族自治县', children: null },
                { id: 4502, name: '华宁县', children: null },
                { id: 4503, name: '峨山彝族自治县', children: null },
                { id: 4504, name: '新平彝族傣族自治县', children: null },
                { id: 4505, name: '易门县', children: null },
                { id: 4506, name: '江川县', children: null },
                { id: 4507, name: '澄江县', children: null },
                { id: 4508, name: '红塔区', children: null },
                { id: 4509, name: '通海县', children: null }
              ]
            },
            {
              id: 418,
              name: '保山市',
              children: [
                { id: 4510, name: '施甸县', children: null },
                { id: 4511, name: '昌宁县', children: null },
                { id: 4512, name: '腾冲县', children: null },
                { id: 4513, name: '隆阳区', children: null },
                { id: 4514, name: '龙陵县', children: null }
              ]
            },
            {
              id: 419,
              name: '昭通市',
              children: [
                { id: 4515, name: '大关县', children: null },
                { id: 4516, name: '威信县', children: null },
                { id: 4517, name: '巧家县', children: null },
                { id: 4518, name: '彝良县', children: null },
                { id: 4519, name: '昭阳区', children: null },
                { id: 4520, name: '水富县', children: null },
                { id: 4521, name: '永善县', children: null },
                { id: 4522, name: '盐津县', children: null },
                { id: 4523, name: '绥江县', children: null },
                { id: 4524, name: '镇雄县', children: null },
                { id: 4525, name: '鲁甸县', children: null }
              ]
            },
            {
              id: 420,
              name: '丽江市',
              children: [
                { id: 4526, name: '华坪县', children: null },
                { id: 4527, name: '古城区', children: null },
                { id: 4528, name: '宁蒗彝族自治县', children: null },
                { id: 4529, name: '永胜县', children: null },
                { id: 4530, name: '玉龙纳西族自治县', children: null }
              ]
            },
            { id: 421, name: '思茅市', children: [] },
            {
              id: 422,
              name: '临沧市',
              children: [
                { id: 4531, name: '临翔区', children: null },
                { id: 4532, name: '云县', children: null },
                { id: 4533, name: '凤庆县', children: null },
                { id: 4534, name: '双江拉祜族佤族布朗族傣族自治县', children: null },
                { id: 4535, name: '永德县', children: null },
                { id: 4536, name: '沧源佤族自治县', children: null },
                { id: 4537, name: '耿马傣族佤族自治县', children: null },
                { id: 4538, name: '镇康县', children: null }
              ]
            },
            {
              id: 423,
              name: '楚雄彝族自治州',
              children: [
                { id: 4539, name: '元谋县', children: null },
                { id: 4540, name: '南华县', children: null },
                { id: 4541, name: '双柏县', children: null },
                { id: 4542, name: '大姚县', children: null },
                { id: 4543, name: '姚安县', children: null },
                { id: 4544, name: '楚雄市', children: null },
                { id: 4545, name: '武定县', children: null },
                { id: 4546, name: '永仁县', children: null },
                { id: 4547, name: '牟定县', children: null },
                { id: 4548, name: '禄丰县', children: null }
              ]
            },
            {
              id: 424,
              name: '红河哈尼族彝族自治州',
              children: [
                { id: 4549, name: '个旧市', children: null },
                { id: 4550, name: '元阳县', children: null },
                { id: 4551, name: '屏边苗族自治县', children: null },
                { id: 4552, name: '建水县', children: null },
                { id: 4553, name: '开远市', children: null },
                { id: 4554, name: '弥勒县', children: null },
                { id: 4555, name: '河口瑶族自治县', children: null },
                { id: 4556, name: '泸西县', children: null },
                { id: 4557, name: '石屏县', children: null },
                { id: 4558, name: '红河县', children: null },
                { id: 4559, name: '绿春县', children: null },
                { id: 4560, name: '蒙自县', children: null },
                { id: 4561, name: '金平苗族瑶族傣族自治县', children: null }
              ]
            },
            {
              id: 425,
              name: '文山壮族苗族自治州',
              children: [
                { id: 4562, name: '丘北县', children: null },
                { id: 4563, name: '富宁县', children: null },
                { id: 4564, name: '广南县', children: null },
                { id: 4565, name: '文山县', children: null },
                { id: 4566, name: '砚山县', children: null },
                { id: 4567, name: '西畴县', children: null },
                { id: 4568, name: '马关县', children: null },
                { id: 4569, name: '麻栗坡县', children: null }
              ]
            },
            {
              id: 426,
              name: '西双版纳傣族自治州',
              children: [
                { id: 4570, name: '勐海县', children: null },
                { id: 4571, name: '勐腊县', children: null },
                { id: 4572, name: '景洪市', children: null }
              ]
            },
            {
              id: 427,
              name: '大理白族自治州',
              children: [
                { id: 4573, name: '云龙县', children: null },
                { id: 4574, name: '剑川县', children: null },
                { id: 4575, name: '南涧彝族自治县', children: null },
                { id: 4576, name: '大理市', children: null },
                { id: 4577, name: '宾川县', children: null },
                { id: 4578, name: '巍山彝族回族自治县', children: null },
                { id: 4579, name: '弥渡县', children: null },
                { id: 4580, name: '永平县', children: null },
                { id: 4581, name: '洱源县', children: null },
                { id: 4582, name: '漾濞彝族自治县', children: null },
                { id: 4583, name: '祥云县', children: null },
                { id: 4584, name: '鹤庆县', children: null }
              ]
            },
            {
              id: 428,
              name: '德宏傣族景颇族自治州',
              children: [
                { id: 4585, name: '梁河县', children: null },
                { id: 4586, name: '潞西市', children: null },
                { id: 4587, name: '瑞丽市', children: null },
                { id: 4588, name: '盈江县', children: null },
                { id: 4589, name: '陇川县', children: null }
              ]
            },
            { id: 429, name: '怒江傈僳族自治州', children: [] },
            {
              id: 430,
              name: '迪庆藏族自治州',
              children: [
                { id: 4590, name: '德钦县', children: null },
                { id: 4591, name: '维西傈僳族自治县', children: null },
                { id: 4592, name: '香格里拉县', children: null }
              ]
            }
          ]
        },
        {
          id: 26,
          name: '西藏自治区',
          children: [
            {
              id: 431,
              name: '拉萨市',
              children: [
                { id: 4593, name: '城关区', children: null },
                { id: 4594, name: '堆龙德庆县', children: null },
                { id: 4595, name: '墨竹工卡县', children: null },
                { id: 4596, name: '尼木县', children: null },
                { id: 4597, name: '当雄县', children: null },
                { id: 4598, name: '曲水县', children: null },
                { id: 4599, name: '林周县', children: null },
                { id: 4600, name: '达孜县', children: null }
              ]
            },
            {
              id: 432,
              name: '昌都地区',
              children: [
                { id: 4608, name: '类乌齐县', children: null },
                { id: 4609, name: '芒康县', children: null },
                { id: 4610, name: '贡觉县', children: null },
                { id: 4611, name: '边坝县', children: null },
                { id: 4601, name: '丁青县', children: null },
                { id: 4602, name: '八宿县', children: null },
                { id: 4603, name: '察雅县', children: null },
                { id: 4604, name: '左贡县', children: null },
                { id: 4605, name: '昌都县', children: null },
                { id: 4606, name: '江达县', children: null },
                { id: 4607, name: '洛隆县', children: null }
              ]
            },
            {
              id: 433,
              name: '山南地区',
              children: [
                { id: 4612, name: '乃东县', children: null },
                { id: 4613, name: '加查县', children: null },
                { id: 4614, name: '扎囊县', children: null },
                { id: 4615, name: '措美县', children: null },
                { id: 4616, name: '曲松县', children: null },
                { id: 4617, name: '桑日县', children: null },
                { id: 4618, name: '洛扎县', children: null },
                { id: 4619, name: '浪卡子县', children: null },
                { id: 4620, name: '琼结县', children: null },
                { id: 4621, name: '贡嘎县', children: null },
                { id: 4622, name: '错那县', children: null },
                { id: 4623, name: '隆子县', children: null }
              ]
            },
            {
              id: 434,
              name: '日喀则地区',
              children: [
                { id: 4624, name: '亚东县', children: null },
                { id: 4625, name: '仁布县', children: null },
                { id: 4626, name: '仲巴县', children: null },
                { id: 4627, name: '南木林县', children: null },
                { id: 4628, name: '吉隆县', children: null },
                { id: 4629, name: '定日县', children: null },
                { id: 4630, name: '定结县', children: null },
                { id: 4631, name: '岗巴县', children: null },
                { id: 4632, name: '康马县', children: null },
                { id: 4633, name: '拉孜县', children: null },
                { id: 4634, name: '日喀则市', children: null },
                { id: 4635, name: '昂仁县', children: null },
                { id: 4636, name: '江孜县', children: null },
                { id: 4637, name: '白朗县', children: null },
                { id: 4638, name: '聂拉木县', children: null },
                { id: 4639, name: '萨嘎县', children: null },
                { id: 4640, name: '萨迦县', children: null },
                { id: 4641, name: '谢通门县', children: null }
              ]
            },
            {
              id: 435,
              name: '那曲地区',
              children: [
                { id: 4642, name: '嘉黎县', children: null },
                { id: 4643, name: '安多县', children: null },
                { id: 4644, name: '尼玛县', children: null },
                { id: 4645, name: '巴青县', children: null },
                { id: 4646, name: '比如县', children: null },
                { id: 4647, name: '班戈县', children: null },
                { id: 4648, name: '申扎县', children: null },
                { id: 4649, name: '索县', children: null },
                { id: 4650, name: '聂荣县', children: null },
                { id: 4651, name: '那曲县', children: null }
              ]
            },
            {
              id: 436,
              name: '阿里地区',
              children: [
                { id: 4652, name: '噶尔县', children: null },
                { id: 4653, name: '措勤县', children: null },
                { id: 4654, name: '改则县', children: null },
                { id: 4655, name: '日土县', children: null },
                { id: 4656, name: '普兰县', children: null },
                { id: 4657, name: '札达县', children: null },
                { id: 4658, name: '革吉县', children: null }
              ]
            },
            {
              id: 437,
              name: '林芝地区',
              children: [
                { id: 4659, name: '墨脱县', children: null },
                { id: 4660, name: '察隅县', children: null },
                { id: 4661, name: '工布江达县', children: null },
                { id: 4662, name: '朗县', children: null },
                { id: 4663, name: '林芝县', children: null },
                { id: 4664, name: '波密县', children: null },
                { id: 4665, name: '米林县', children: null }
              ]
            }
          ]
        },
        {
          id: 27,
          name: '陕西省',
          children: [
            {
              id: 438,
              name: '西安市',
              children: [
                { id: 4666, name: '临潼区', children: null },
                { id: 4667, name: '周至县', children: null },
                { id: 4668, name: '户县', children: null },
                { id: 4669, name: '新城区', children: null },
                { id: 4670, name: '未央区', children: null },
                { id: 4671, name: '灞桥区', children: null },
                { id: 4672, name: '碑林区', children: null },
                { id: 4673, name: '莲湖区', children: null },
                { id: 4674, name: '蓝田县', children: null },
                { id: 4675, name: '长安区', children: null },
                { id: 4676, name: '阎良区', children: null },
                { id: 4677, name: '雁塔区', children: null },
                { id: 4678, name: '高陵县', children: null }
              ]
            },
            {
              id: 439,
              name: '铜川市',
              children: [
                { id: 4679, name: '印台区', children: null },
                { id: 4680, name: '宜君县', children: null },
                { id: 4681, name: '王益区', children: null },
                { id: 4682, name: '耀州区', children: null }
              ]
            },
            {
              id: 440,
              name: '宝鸡市',
              children: [
                { id: 4683, name: '凤县', children: null },
                { id: 4684, name: '凤翔县', children: null },
                { id: 4685, name: '千阳县', children: null },
                { id: 4686, name: '太白县', children: null },
                { id: 4687, name: '岐山县', children: null },
                { id: 4688, name: '扶风县', children: null },
                { id: 4689, name: '渭滨区', children: null },
                { id: 4690, name: '眉县', children: null },
                { id: 4691, name: '金台区', children: null },
                { id: 4692, name: '陇县', children: null },
                { id: 4693, name: '陈仓区', children: null },
                { id: 4694, name: '麟游县', children: null }
              ]
            },
            {
              id: 441,
              name: '咸阳市',
              children: [
                { id: 4695, name: '三原县', children: null },
                { id: 4696, name: '干县', children: null },
                { id: 4697, name: '兴平市', children: null },
                { id: 4698, name: '彬县', children: null },
                { id: 4699, name: '旬邑县', children: null },
                { id: 4700, name: '杨陵区', children: null },
                { id: 4701, name: '武功县', children: null },
                { id: 4702, name: '永寿县', children: null },
                { id: 4703, name: '泾阳县', children: null },
                { id: 4704, name: '淳化县', children: null },
                { id: 4705, name: '渭城区', children: null },
                { id: 4706, name: '礼泉县', children: null },
                { id: 4707, name: '秦都区', children: null },
                { id: 4708, name: '长武县', children: null }
              ]
            },
            {
              id: 442,
              name: '渭南市',
              children: [
                { id: 4709, name: '临渭区', children: null },
                { id: 4710, name: '华县', children: null },
                { id: 4711, name: '华阴市', children: null },
                { id: 4712, name: '合阳县', children: null },
                { id: 4713, name: '大荔县', children: null },
                { id: 4714, name: '富平县', children: null },
                { id: 4715, name: '潼关县', children: null },
                { id: 4716, name: '澄城县', children: null },
                { id: 4717, name: '白水县', children: null },
                { id: 4718, name: '蒲城县', children: null },
                { id: 4719, name: '韩城市', children: null }
              ]
            },
            {
              id: 443,
              name: '延安市',
              children: [
                { id: 4720, name: '吴起县', children: null },
                { id: 4721, name: '子长县', children: null },
                { id: 4722, name: '安塞县', children: null },
                { id: 4723, name: '宜川县', children: null },
                { id: 4724, name: '宝塔区', children: null },
                { id: 4725, name: '富县', children: null },
                { id: 4726, name: '延川县', children: null },
                { id: 4727, name: '延长县', children: null },
                { id: 4728, name: '志丹县', children: null },
                { id: 4729, name: '洛川县', children: null },
                { id: 4730, name: '甘泉县', children: null },
                { id: 4731, name: '黄陵县', children: null },
                { id: 4732, name: '黄龙县', children: null }
              ]
            },
            {
              id: 444,
              name: '汉中市',
              children: [
                { id: 4733, name: '佛坪县', children: null },
                { id: 4734, name: '勉县', children: null },
                { id: 4735, name: '南郑县', children: null },
                { id: 4736, name: '城固县', children: null },
                { id: 4737, name: '宁强县', children: null },
                { id: 4738, name: '汉台区', children: null },
                { id: 4739, name: '洋县', children: null },
                { id: 4740, name: '留坝县', children: null },
                { id: 4741, name: '略阳县', children: null },
                { id: 4742, name: '西乡县', children: null },
                { id: 4743, name: '镇巴县', children: null }
              ]
            },
            {
              id: 445,
              name: '榆林市',
              children: [
                { id: 4744, name: '佳县', children: null },
                { id: 4745, name: '吴堡县', children: null },
                { id: 4746, name: '子洲县', children: null },
                { id: 4747, name: '定边县', children: null },
                { id: 4748, name: '府谷县', children: null },
                { id: 4749, name: '榆林市榆阳区', children: null },
                { id: 4750, name: '横山县', children: null },
                { id: 4751, name: '清涧县', children: null },
                { id: 4752, name: '神木县', children: null },
                { id: 4753, name: '米脂县', children: null },
                { id: 4754, name: '绥德县', children: null },
                { id: 4755, name: '靖边县', children: null }
              ]
            },
            {
              id: 446,
              name: '安康市',
              children: [
                { id: 4756, name: '宁陕县', children: null },
                { id: 4757, name: '岚皋县', children: null },
                { id: 4758, name: '平利县', children: null },
                { id: 4759, name: '旬阳县', children: null },
                { id: 4760, name: '汉滨区', children: null },
                { id: 4761, name: '汉阴县', children: null },
                { id: 4762, name: '白河县', children: null },
                { id: 4763, name: '石泉县', children: null },
                { id: 4764, name: '紫阳县', children: null },
                { id: 4765, name: '镇坪县', children: null }
              ]
            },
            {
              id: 447,
              name: '商洛市',
              children: [
                { id: 4766, name: '丹凤县', children: null },
                { id: 4767, name: '商南县', children: null },
                { id: 4768, name: '商州区', children: null },
                { id: 4769, name: '山阳县', children: null },
                { id: 4770, name: '柞水县', children: null },
                { id: 4771, name: '洛南县', children: null },
                { id: 4772, name: '镇安县', children: null }
              ]
            }
          ]
        },
        {
          id: 28,
          name: '甘肃省',
          children: [
            {
              id: 448,
              name: '兰州市',
              children: [
                { id: 4773, name: '七里河区', children: null },
                { id: 4774, name: '城关区', children: null },
                { id: 4775, name: '安宁区', children: null },
                { id: 4776, name: '榆中县', children: null },
                { id: 4777, name: '永登县', children: null },
                { id: 4778, name: '皋兰县', children: null },
                { id: 4779, name: '红古区', children: null },
                { id: 4780, name: '西固区', children: null }
              ]
            },
            {
              id: 449,
              name: '嘉峪关市',
              children: [{ id: 4781, name: '嘉峪关市', children: null }]
            },
            {
              id: 450,
              name: '金昌市',
              children: [
                { id: 4782, name: '永昌县', children: null },
                { id: 4783, name: '金川区', children: null }
              ]
            },
            {
              id: 451,
              name: '白银市',
              children: [
                { id: 4784, name: '会宁县', children: null },
                { id: 4785, name: '平川区', children: null },
                { id: 4786, name: '景泰县', children: null },
                { id: 4787, name: '白银区', children: null },
                { id: 4788, name: '靖远县', children: null }
              ]
            },
            {
              id: 452,
              name: '天水市',
              children: [
                { id: 4789, name: '张家川回族自治县', children: null },
                { id: 4790, name: '武山县', children: null },
                { id: 4791, name: '清水县', children: null },
                { id: 4792, name: '甘谷县', children: null },
                { id: 4793, name: '秦安县', children: null },
                { id: 4794, name: '秦州区', children: null },
                { id: 4795, name: '麦积区', children: null }
              ]
            },
            {
              id: 453,
              name: '武威市',
              children: [
                { id: 4796, name: '凉州区', children: null },
                { id: 4797, name: '古浪县', children: null },
                { id: 4798, name: '天祝藏族自治县', children: null },
                { id: 4799, name: '民勤县', children: null }
              ]
            },
            {
              id: 454,
              name: '张掖市',
              children: [
                { id: 4800, name: '临泽县', children: null },
                { id: 4801, name: '山丹县', children: null },
                { id: 4802, name: '民乐县', children: null },
                { id: 4803, name: '甘州区', children: null },
                { id: 4804, name: '肃南裕固族自治县', children: null },
                { id: 4805, name: '高台县', children: null }
              ]
            },
            {
              id: 455,
              name: '平凉市',
              children: [
                { id: 4806, name: '华亭县', children: null },
                { id: 4807, name: '崆峒区', children: null },
                { id: 4808, name: '崇信县', children: null },
                { id: 4809, name: '庄浪县', children: null },
                { id: 4810, name: '泾川县', children: null },
                { id: 4811, name: '灵台县', children: null },
                { id: 4812, name: '静宁县', children: null }
              ]
            },
            {
              id: 456,
              name: '酒泉市',
              children: [
                { id: 4813, name: '敦煌市', children: null },
                { id: 4814, name: '玉门市', children: null },
                { id: 4815, name: '瓜州县（原安西县）', children: null },
                { id: 4816, name: '肃北蒙古族自治县', children: null },
                { id: 4817, name: '肃州区', children: null },
                { id: 4818, name: '金塔县', children: null },
                { id: 4819, name: '阿克塞哈萨克族自治县', children: null }
              ]
            },
            {
              id: 457,
              name: '庆阳市',
              children: [
                { id: 4820, name: '华池县', children: null },
                { id: 4821, name: '合水县', children: null },
                { id: 4822, name: '宁县', children: null },
                { id: 4823, name: '庆城县', children: null },
                { id: 4824, name: '正宁县', children: null },
                { id: 4825, name: '环县', children: null },
                { id: 4826, name: '西峰区', children: null },
                { id: 4827, name: '镇原县', children: null }
              ]
            },
            {
              id: 458,
              name: '定西市',
              children: [
                { id: 4828, name: '临洮县', children: null },
                { id: 4829, name: '安定区', children: null },
                { id: 4830, name: '岷县', children: null },
                { id: 4831, name: '渭源县', children: null },
                { id: 4832, name: '漳县', children: null },
                { id: 4833, name: '通渭县', children: null },
                { id: 4834, name: '陇西县', children: null }
              ]
            },
            {
              id: 459,
              name: '陇南市',
              children: [
                { id: 4835, name: '两当县', children: null },
                { id: 4836, name: '宕昌县', children: null },
                { id: 4837, name: '康县', children: null },
                { id: 4838, name: '徽县', children: null },
                { id: 4839, name: '成县', children: null },
                { id: 4840, name: '文县', children: null },
                { id: 4841, name: '武都区', children: null },
                { id: 4842, name: '礼县', children: null },
                { id: 4843, name: '西和县', children: null }
              ]
            },
            {
              id: 460,
              name: '临夏回族自治州',
              children: [
                { id: 4844, name: '东乡族自治县', children: null },
                { id: 4845, name: '临夏县', children: null },
                { id: 4846, name: '临夏市', children: null },
                { id: 4847, name: '和政县', children: null },
                { id: 4848, name: '广河县', children: null },
                { id: 4849, name: '康乐县', children: null },
                { id: 4850, name: '永靖县', children: null },
                { id: 4851, name: '积石山保安族东乡族撒拉族自治县', children: null }
              ]
            },
            {
              id: 461,
              name: '甘南藏族自治州',
              children: [
                { id: 4852, name: '临潭县', children: null },
                { id: 4853, name: '卓尼县', children: null },
                { id: 4854, name: '合作市', children: null },
                { id: 4855, name: '夏河县', children: null },
                { id: 4856, name: '玛曲县', children: null },
                { id: 4857, name: '碌曲县', children: null },
                { id: 4858, name: '舟曲县', children: null },
                { id: 4859, name: '迭部县', children: null }
              ]
            }
          ]
        },
        {
          id: 29,
          name: '青海省',
          children: [
            {
              id: 462,
              name: '西宁市',
              children: [
                { id: 4864, name: '大通回族土族自治县', children: null },
                { id: 4865, name: '湟中县', children: null },
                { id: 4866, name: '湟源县', children: null },
                { id: 4860, name: '城东区', children: null },
                { id: 4861, name: '城中区', children: null },
                { id: 4862, name: '城北区', children: null },
                { id: 4863, name: '城西区', children: null }
              ]
            },
            {
              id: 463,
              name: '海东地区',
              children: [
                { id: 4867, name: '乐都县', children: null },
                { id: 4868, name: '互助土族自治县', children: null },
                { id: 4869, name: '化隆回族自治县', children: null },
                { id: 4870, name: '平安县', children: null },
                { id: 4871, name: '循化撒拉族自治县', children: null },
                { id: 4872, name: '民和回族土族自治县', children: null }
              ]
            },
            {
              id: 464,
              name: '海北藏族自治州',
              children: [
                { id: 4873, name: '刚察县', children: null },
                { id: 4874, name: '海晏县', children: null },
                { id: 4875, name: '祁连县', children: null },
                { id: 4876, name: '门源回族自治县', children: null }
              ]
            },
            {
              id: 465,
              name: '黄南藏族自治州',
              children: [
                { id: 4877, name: '同仁县', children: null },
                { id: 4878, name: '尖扎县', children: null },
                { id: 4879, name: '河南蒙古族自治县', children: null },
                { id: 4880, name: '泽库县', children: null }
              ]
            },
            {
              id: 466,
              name: '海南藏族自治州',
              children: [
                { id: 4881, name: '共和县', children: null },
                { id: 4882, name: '兴海县', children: null },
                { id: 4883, name: '同德县', children: null },
                { id: 4884, name: '贵南县', children: null },
                { id: 4885, name: '贵德县', children: null }
              ]
            },
            {
              id: 467,
              name: '果洛藏族自治州',
              children: [
                { id: 4886, name: '久治县', children: null },
                { id: 4887, name: '玛多县', children: null },
                { id: 4888, name: '玛沁县', children: null },
                { id: 4889, name: '班玛县', children: null },
                { id: 4890, name: '甘德县', children: null },
                { id: 4891, name: '达日县', children: null }
              ]
            },
            {
              id: 468,
              name: '玉树藏族自治州',
              children: [
                { id: 4892, name: '囊谦县', children: null },
                { id: 4893, name: '曲麻莱县', children: null },
                { id: 4894, name: '杂多县', children: null },
                { id: 4895, name: '治多县', children: null },
                { id: 4896, name: '玉树县', children: null },
                { id: 4897, name: '称多县', children: null }
              ]
            },
            {
              id: 469,
              name: '海西蒙古族藏族自治州',
              children: [
                { id: 4898, name: '乌兰县', children: null },
                { id: 4899, name: '冷湖行委', children: null },
                { id: 4900, name: '大柴旦行委', children: null },
                { id: 4901, name: '天峻县', children: null },
                { id: 4902, name: '德令哈市', children: null },
                { id: 4903, name: '格尔木市', children: null },
                { id: 4904, name: '茫崖行委', children: null },
                { id: 4905, name: '都兰县', children: null }
              ]
            }
          ]
        },
        {
          id: 30,
          name: '宁夏回族自治区',
          children: [
            {
              id: 470,
              name: '银川市',
              children: [
                { id: 4906, name: '兴庆区', children: null },
                { id: 4907, name: '永宁县', children: null },
                { id: 4908, name: '灵武市', children: null },
                { id: 4909, name: '西夏区', children: null },
                { id: 4910, name: '贺兰县', children: null },
                { id: 4911, name: '金凤区', children: null }
              ]
            },
            {
              id: 471,
              name: '石嘴山市',
              children: [
                { id: 4912, name: '大武口区', children: null },
                { id: 4913, name: '平罗县', children: null },
                { id: 4914, name: '惠农区', children: null }
              ]
            },
            {
              id: 472,
              name: '吴忠市',
              children: [
                { id: 4915, name: '利通区', children: null },
                { id: 4916, name: '同心县', children: null },
                { id: 4917, name: '盐池县', children: null },
                { id: 4918, name: '青铜峡市', children: null }
              ]
            },
            {
              id: 473,
              name: '固原市',
              children: [
                { id: 4919, name: '原州区', children: null },
                { id: 4920, name: '彭阳县', children: null },
                { id: 4921, name: '泾源县', children: null },
                { id: 4922, name: '西吉县', children: null },
                { id: 4923, name: '隆德县', children: null }
              ]
            },
            {
              id: 474,
              name: '中卫市',
              children: [
                { id: 4924, name: '中宁县', children: null },
                { id: 4925, name: '沙坡头区', children: null },
                { id: 4926, name: '海原县', children: null }
              ]
            }
          ]
        },
        {
          id: 31,
          name: '新疆维吾尔自治区',
          children: [
            {
              id: 475,
              name: '乌鲁木齐市',
              children: [
                { id: 4927, name: '东山区', children: null },
                { id: 4928, name: '乌鲁木齐县', children: null },
                { id: 4929, name: '天山区', children: null },
                { id: 4930, name: '头屯河区', children: null },
                { id: 4931, name: '新市区', children: null },
                { id: 4932, name: '水磨沟区', children: null },
                { id: 4933, name: '沙依巴克区', children: null },
                { id: 4934, name: '达坂城区', children: null }
              ]
            },
            {
              id: 476,
              name: '克拉玛依市',
              children: [
                { id: 4935, name: '乌尔禾区', children: null },
                { id: 4936, name: '克拉玛依区', children: null },
                { id: 4937, name: '独山子区', children: null },
                { id: 4938, name: '白碱滩区', children: null }
              ]
            },
            {
              id: 477,
              name: '吐鲁番地区',
              children: [
                { id: 4939, name: '吐鲁番市', children: null },
                { id: 4940, name: '托克逊县', children: null },
                { id: 4941, name: '鄯善县', children: null }
              ]
            },
            {
              id: 478,
              name: '哈密地区',
              children: [
                { id: 4942, name: '伊吾县', children: null },
                { id: 4943, name: '哈密市', children: null },
                { id: 4944, name: '巴里坤哈萨克自治县', children: null }
              ]
            },
            {
              id: 479,
              name: '昌吉回族自治州',
              children: [
                { id: 4945, name: '吉木萨尔县', children: null },
                { id: 4946, name: '呼图壁县', children: null },
                { id: 4947, name: '奇台县', children: null },
                { id: 4948, name: '昌吉市', children: null },
                { id: 4949, name: '木垒哈萨克自治县', children: null },
                { id: 4950, name: '玛纳斯县', children: null },
                { id: 4951, name: '米泉市', children: null },
                { id: 4952, name: '阜康市', children: null }
              ]
            },
            {
              id: 480,
              name: '博尔塔拉蒙古自治州',
              children: [
                { id: 4953, name: '博乐市', children: null },
                { id: 4954, name: '温泉县', children: null },
                { id: 4955, name: '精河县', children: null }
              ]
            },
            {
              id: 481,
              name: '巴音郭楞蒙古自治州',
              children: [
                { id: 4956, name: '博湖县', children: null },
                { id: 4957, name: '和硕县', children: null },
                { id: 4958, name: '和静县', children: null },
                { id: 4959, name: '尉犁县', children: null },
                { id: 4960, name: '库尔勒市', children: null },
                { id: 4961, name: '焉耆回族自治县', children: null },
                { id: 4962, name: '若羌县', children: null },
                { id: 4963, name: '轮台县', children: null }
              ]
            },
            {
              id: 482,
              name: '阿克苏地区',
              children: [
                { id: 4964, name: '乌什县', children: null },
                { id: 4965, name: '库车县', children: null },
                { id: 4966, name: '拜城县', children: null },
                { id: 4967, name: '新和县', children: null },
                { id: 4968, name: '柯坪县', children: null },
                { id: 4969, name: '沙雅县', children: null },
                { id: 4970, name: '温宿县', children: null },
                { id: 4971, name: '阿克苏市', children: null },
                { id: 4972, name: '阿瓦提县', children: null }
              ]
            },
            {
              id: 483,
              name: '克孜勒苏柯尔克孜自治州',
              children: [
                { id: 4973, name: '乌恰县', children: null },
                { id: 4974, name: '阿克陶县', children: null },
                { id: 4975, name: '阿合奇县', children: null },
                { id: 4976, name: '阿图什市', children: null }
              ]
            },
            {
              id: 484,
              name: '喀什地区',
              children: [
                { id: 4977, name: '伽师县', children: null },
                { id: 4978, name: '叶城县', children: null },
                { id: 4979, name: '喀什市', children: null },
                { id: 4980, name: '塔什库尔干塔吉克自治县', children: null },
                { id: 4981, name: '岳普湖县', children: null },
                { id: 4982, name: '巴楚县', children: null },
                { id: 4983, name: '泽普县', children: null },
                { id: 4984, name: '疏勒县', children: null },
                { id: 4985, name: '疏附县', children: null },
                { id: 4986, name: '英吉沙县', children: null },
                { id: 4987, name: '莎车县', children: null },
                { id: 4988, name: '麦盖提县', children: null }
              ]
            },
            {
              id: 485,
              name: '和田地区',
              children: [
                { id: 4989, name: '于田县', children: null },
                { id: 4990, name: '和田县', children: null },
                { id: 4991, name: '和田市', children: null },
                { id: 4992, name: '墨玉县', children: null },
                { id: 4993, name: '民丰县', children: null },
                { id: 4994, name: '洛浦县', children: null },
                { id: 4995, name: '皮山县', children: null },
                { id: 4996, name: '策勒县', children: null }
              ]
            },
            {
              id: 486,
              name: '伊犁哈萨克自治州',
              children: [
                { id: 4997, name: '伊宁县', children: null },
                { id: 4998, name: '伊宁市', children: null },
                { id: 4999, name: '奎屯市', children: null },
                { id: 5000, name: '察布查尔锡伯自治县', children: null },
                { id: 5001, name: '尼勒克县', children: null },
                { id: 5002, name: '巩留县', children: null },
                { id: 5003, name: '新源县', children: null },
                { id: 5004, name: '昭苏县', children: null },
                { id: 5005, name: '特克斯县', children: null },
                { id: 5006, name: '霍城县', children: null }
              ]
            },
            {
              id: 487,
              name: '塔城地区',
              children: [
                { id: 5007, name: '乌苏市', children: null },
                { id: 5008, name: '和布克赛尔蒙古自治县', children: null },
                { id: 5009, name: '塔城市', children: null },
                { id: 5010, name: '托里县', children: null },
                { id: 5011, name: '沙湾县', children: null },
                { id: 5012, name: '裕民县', children: null },
                { id: 5013, name: '额敏县', children: null }
              ]
            },
            {
              id: 488,
              name: '阿勒泰地区',
              children: [
                { id: 5014, name: '吉木乃县', children: null },
                { id: 5015, name: '哈巴河县', children: null },
                { id: 5016, name: '富蕴县', children: null },
                { id: 5017, name: '布尔津县', children: null },
                { id: 5018, name: '福海县', children: null },
                { id: 5019, name: '阿勒泰市', children: null },
                { id: 5020, name: '青河县', children: null }
              ]
            },
            {
              id: 489,
              name: '石河子市',
              children: [{ id: 5021, name: '石河子市', children: null }]
            },
            {
              id: 490,
              name: '阿拉尔市',
              children: [{ id: 5022, name: '阿拉尔市', children: null }]
            },
            {
              id: 491,
              name: '图木舒克市',
              children: [{ id: 5023, name: '图木舒克市', children: null }]
            },
            {
              id: 492,
              name: '五家渠市',
              children: [{ id: 5024, name: '五家渠市', children: null }]
            }
          ]
        },
        {
          id: 32,
          name: '台湾省',
          children: [
            { id: 512, name: '屏东县', children: [] },
            { id: 513, name: '澎湖县', children: [] },
            { id: 514, name: '台东县', children: [] },
            { id: 515, name: '花莲县', children: [] },
            { id: 493, name: '台北市', children: [] },
            { id: 494, name: '高雄市', children: [] },
            { id: 495, name: '基隆市', children: [] },
            { id: 496, name: '台中市', children: [] },
            { id: 497, name: '台南市', children: [] },
            { id: 498, name: '新竹市', children: [] },
            { id: 499, name: '嘉义市', children: [] },
            { id: 500, name: '台北县', children: [] },
            { id: 501, name: '宜兰县', children: [] },
            { id: 502, name: '桃园县', children: [] },
            { id: 503, name: '新竹县', children: [] },
            { id: 504, name: '苗栗县', children: [] },
            { id: 505, name: '台中县', children: [] },
            { id: 506, name: '彰化县', children: [] },
            { id: 507, name: '南投县', children: [] },
            { id: 508, name: '云林县', children: [] },
            { id: 509, name: '嘉义县', children: [] },
            { id: 510, name: '台南县', children: [] },
            { id: 511, name: '高雄县', children: [] }
          ]
        },
        {
          id: 33,
          name: '香港特别行政区',
          children: [
            { id: 516, name: '中西区', children: [] },
            { id: 517, name: '东区', children: [] },
            { id: 518, name: '九龙城区', children: [] },
            { id: 519, name: '观塘区', children: [] },
            { id: 520, name: '南区', children: [] },
            { id: 521, name: '深水埗区', children: [] },
            { id: 522, name: '黄大仙区', children: [] },
            { id: 523, name: '湾仔区', children: [] },
            { id: 524, name: '油尖旺区', children: [] },
            { id: 525, name: '离岛区', children: [] },
            { id: 526, name: '葵青区', children: [] },
            { id: 527, name: '北区', children: [] },
            { id: 528, name: '西贡区', children: [] },
            { id: 529, name: '沙田区', children: [] },
            { id: 530, name: '屯门区', children: [] },
            { id: 531, name: '大埔区', children: [] },
            { id: 532, name: '荃湾区', children: [] },
            { id: 533, name: '元朗区', children: [] }
          ]
        },
        {
          id: 34,
          name: '澳门特别行政区',
          children: [{ id: 534, name: '澳门特别行政区', children: [] }]
        }
      ]
    }
  },
  /*     watch:{
        provinceId1:function(newVal,oldVal){
        this.provinceId = newVal;
        },
        cityId1:function(newVal,oldVal){
        this.cityId = newVal;
        },
        districId1:function(newVal,oldVal){
        this.districId = newVal;
        }
    }, */

  created() {
    this.init()
    // this.getCityList()
  },
  methods: {
    init() {
      this.selectedOptions = this.items
    },
    setValue(provinceId, cityId, districtId) {
      this.provinceId = provinceId
      this.cityId = cityId
      this.districtId = districtId
      console.log('赋值成功' + this.provinceId)
    },
    getCityList() {
      listProvince()
        .then(response => {
          if (response.code == 0) {
            this.options = response.result
          }
        })
        .catch(() => {
          this.options = []
        })
    },

    handleChange(val) {
      const labels = this.$refs['cascaderAddr'].currentLabels
      this.provinceId = this.selectedOptions[0]
      this.cityId = this.selectedOptions[1]
      this.districtId = this.selectedOptions[2]
      this.provinceName = labels[0]
      this.cityName = labels[1]
      this.districtName = labels[2]
      this.$emit('changeCascaderAddr', this.selectedOptions, labels)
    }
  }
}
</script>
