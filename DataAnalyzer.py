import pandas as pd
from itertools import combinations
import numpy as np
import datetime
import os

dataFrame = ""
columnsWithSameValue = []


def startAnalyze(csv_path):
	global dataFrame
	# print("Importing CSV File\n")
	csv = pd.read_csv(csv_path, low_memory=False)
	csv_no_head = pd.read_csv(csv_path, header=None, low_memory=False)
	dataFrame = pd.DataFrame(csv)
	dataFrameNoHead = pd.DataFrame(csv_no_head)
	rows = len(dataFrame.axes[0])
	columns = len(dataFrame.axes[1])
	emptyCells = dataFrame.isnull()
	emptyCellsCount = emptyCells.sum().sum()
	missingRate = str(round((emptyCellsCount / (rows * columns)) * 100, 2))
	fullEmptyColumns = [col for col in dataFrame.columns if dataFrame[col].isnull().all()]
	anyValueMissingColumn = dataFrame.columns[dataFrame.isnull().any()]
	singleValueColumnList = dataFrame.apply(pd.Series.nunique)
	singleValueColumn = singleValueColumnList[singleValueColumnList == 1]
	# anyValueMissingRowsByColumnName = dataFrame[anyValueMissingColumn[0]]
	columnList = pd.DataFrame(dataFrameNoHead.head(1))
	duplicateHeaderNames = [(i, j) for i, j in combinations(columnList, 2) if columnList[i].equals(columnList[j])]
	if len(duplicateHeaderNames) > 0:
		duplicateHeaderNames = duplicateHeaderNames[0]
	duplicateRows = dataFrame[dataFrame.duplicated()]
	anyValueMissingRow = dataFrame[dataFrame.isnull().any(axis=1)]
	anyValueMissingRow = pd.DataFrame(anyValueMissingRow)
	anyValueMissingRow = len(anyValueMissingRow.axes[0])
	mainDF = list(dataFrame.head(0))
	for colIt in range(columns):
		for allIt in range(columns):
			# print(colIt)
			if (dataFrame.iloc[:, colIt]).equals(dataFrame.iloc[:, allIt]) and colIt != allIt:
				columnsWithSameValue.append(mainDF[colIt])
				# print(mainDF[colIt] + " matches with " + mainDF[allIt])
	# columnsHavingSameValue = dataFrame.loc[:, ~dataFrame.columns.duplicated()]
	# columnsHavingSameValue = list(columnsHavingSameValue.head(0))
	# print(columnsHavingSameValue)
	# columnsHavingSameValue = [(i, j) for i, j in combinations(dataFrame, 2) if dataFrame[i].equals(dataFrame[j])]
	# if len(columnsHavingSameValue) > 0:
	# 	columnsHavingSameValue = columnsHavingSameValue[0]
	print("Columns: " + str(columns) + "\nRows: " + str(rows) + "\nEmpty Cells: " + str(
		emptyCellsCount) + "\nMissing Rate: " + str(missingRate) + "%" + "\nFull Empty Columns: " + str(
		len(fullEmptyColumns)) + "\nDuplicated Header: " + str(
		len(duplicateHeaderNames)) + "\nSingle value column: " + str(
		len(singleValueColumn)) + "\nColumn with Missing Data: " + str(
		len(anyValueMissingColumn)) + "\nDuplicate Rows: " + str(len(duplicateRows)) + "\nIncomplete Rows: " + str(
		anyValueMissingRow) + "\nColumns with Same Value: " + str(len(
		columnsWithSameValue)))

	cellMapping = np.zeros((rows, columns))
	for i in range(len(emptyCells)):
		for j in range(columns):
			if not emptyCells.iloc[i, j]:
				cellMapping[i][j] = 1

	duplicateMapping = np.zeros(columns)
	# print(duplicateMapping)
	for j in range(columns):
		for col in duplicateHeaderNames:
			if columnList[col][0] == columnList[j].any():
				duplicateMapping[j] = 1
				break
	# print(duplicateMapping)

	duplicateHeaderArray = [""] * len(duplicateHeaderNames)
	# print(duplicateHeaderArray)
	for key, col in enumerate(duplicateHeaderNames):
		# print('Duplicate header name : ', [col][0])
		print('Duplicate header name : ', mainDF[col])
		# print('Duplicate header name : ', columnList[col][0])
		# duplicateHeaderArray[key] = columnList[col][0]
		duplicateHeaderArray[key] = mainDF[col]
	# print(duplicateHeaderArray)
	# df.drop_duplicates(subset=['A', 'C'], keep=False) keep first / last

	singleValueColumnArray = [""] * len(pd.DataFrame(singleValueColumn).axes[0])
	# print(singleValueColumnArray)
	for key, col in enumerate(pd.DataFrame(singleValueColumn).axes[0]):
		# print('Single value column name : ', col)
		singleValueColumnArray[key] = col
	# print(singleValueColumnArray)

	anyValueMissingColumnArray = [""] * len(anyValueMissingColumn)
	for key, col in enumerate(anyValueMissingColumn):
		# print('Missing data : ' + col + " (" + str(round((dataFrame[col].isnull().sum()/len(dataFrame[col]))*100, 2)) + "%)")
		anyValueMissingColumnArray[key] = col + "," + str(
			round((dataFrame[col].isnull().sum() / len(dataFrame[col])) * 100, 2))
	# print(anyValueMissingColumnArray)

	columnsHavingSameValueArray = [""] * len(columnsWithSameValue)
	for key, col in enumerate(columnsWithSameValue):
		# print('Same value column name : ', col)
		columnsHavingSameValueArray[key] = col
	# print(columnsHavingSameValueArray)

	missingMapping = np.zeros(columns)
	# print(duplicateMapping)
	for j in range(columns):
		for col in anyValueMissingColumn:
			if col == columnList[j].any():
				missingMapping[j] = round((dataFrame[col].isnull().sum() / len(dataFrame[col])) * 100, 2)
				break
	# print(missingMapping)

	# print(date_finder(csv_path))
	# print(list(dataFrame.filter(regex='date_time')))
	# print(list(dataFrame.filter(regex='date')))
	# print(list(dataFrame.filter(regex='time')))
	# print(list(dataFrame.filter(regex='Date')))
	# print(list(dataFrame.filter(regex='Time')))
	# print(list(dataFrame.filter(regex='DATE')))
	# print(list(dataFrame.filter(regex='TIME')))
	# print(list(dataFrame.filter(regex='DATE_TIME')))
	# print(list(dataFrame.filter(regex='Date_Time')))

	# dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='date_time')))]
	# dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='date')))]
	# dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='time')))]
	# dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='Date')))]
	# dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='Time')))]
	# dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='DATE')))]
	# dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='TIME')))]
	# dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='DATE_TIME')))]
	# dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='Date_Time')))]

	return "Data Received"


def startCleansing(actions):
	global dataFrame
	print(actions)
	allActions = actions.split("&")
	for item in allActions:
		if item[:4] == "SAME":
			if item[-4:] != "KEEP":
				print("Remove columns with same value")
				splitItem = item.split('=')[1]
				splitItem = splitItem[:-6]
				# print(splitItem)
				if splitItem in dataFrame.columns:
					dataFrame.drop(splitItem, axis=1, inplace=True)

	for item in allActions:
		if item[:7] == "MISSING":
			# print(item)
			if item[-4:] != "KEEP":
				print("Remove missing data column")
				splitItem = item.split('=')[1]
				splitItem = splitItem[:-6]
				print(splitItem)
				if splitItem in dataFrame.columns:
					dataFrame.drop(splitItem, axis=1, inplace=True)

	for item in allActions:
		if item[:6] == "SINGLE":
			if item[-4:] != "KEEP":
				print("Remove single value column")
				splitItem = item.split('=')[1]
				splitItem = splitItem[:-6]
				print(splitItem)
				if splitItem in dataFrame.columns:
					dataFrame.drop(splitItem, axis=1, inplace=True)

	for item in allActions:
		if item[:9] == "DUPLICATE":
			if item[-4:] != "KEEP":
				print("Remove duplicate column name")
				splitItem = item.split('=')[1]
				splitItem = splitItem[:-6]
				print(splitItem)
				if splitItem in dataFrame.columns:
					dataFrame.drop(splitItem, axis=1, inplace=True)

	for item in allActions:
		if item[:2] == "IR":
			if item[-4:] != "KEEP":
				print("Remove incomplete rows")
				dataFrame = dataFrame.dropna()

	for item in allActions:
		if item[:2] == "DR":
			if item[-4:] != "KEEP":
				print("Remove duplicate rows")
				dataFrame = dataFrame.drop_duplicates(keep='first')

	dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='date_time')))]
	dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='date')))]
	dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='time')))]
	dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='Date')))]
	dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='Time')))]
	dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='DATE')))]
	dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='TIME')))]
	dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='DATE_TIME')))]
	dataFrame = dataFrame[dataFrame.columns.drop(list(dataFrame.filter(regex='Date_Time')))]

	if not os.path.exists('Output'):
		os.mkdir('Output')

	dataFrame.to_csv(r'Output\\CSV_' + datetime.datetime.now().strftime("%d%m%Y%H%M%S") + '.csv', index=False,
					 header=True)


if __name__ == '__main__':
	startAnalyze(
		"E:\\GoogleDrive(md.rafat.hossain@g.bracu.ac.bd)\\ARRANGED\\Client Works\\People Per Hour\\CSV File Analyzer - Peter - PPH\\Sample Data\\CSV_11042020211441.csv")
# startCleansing(
# 	"DUPLICATEsn_120=sn_12REMOVE&DUPLICATE1=sn_12.1KEEP&SINGLEsn_70=sn_7REMOVE&SINGLEsn_101=sn_10REMOVE&MISSINGsn_20=sn_2REMOVE&MISSINGsn_31=sn_3REMOVE&MISSINGsn_52=sn_5REMOVE&MISSINGsn_73=sn_7REMOVE&MISSINGsn_84=sn_8REMOVE&MISSINGsn_95=sn_9REMOVE&MISSINGsn_106=sn_10REMOVE&MISSINGsn_127=sn_12REMOVE&MISSINGsn_12.18=sn_12.1REMOVE&MISSINGsn_139=sn_13REMOVE&MISSINGsn_1610=sn_16REMOVE&SAMEsn_40=sn_4REMOVE&SAMEsn_141=sn_14REMOVE&DR=DR_REMOVE&IR=IR_REMOVE")
