import eel
import wx
import pandas as pd
from itertools import combinations
import sys
import os
import numpy as np
import datetime

dataFrame = ""


@eel.expose
def pythonFunction():
	app = wx.App()
	style = wx.FD_OPEN | wx.FD_FILE_MUST_EXIST
	dialog = wx.FileDialog(None, 'Select CSV File', wildcard='*.csv', style=style)
	if dialog.ShowModal() == wx.ID_OK:
		path = dialog.GetPath()
	else:
		path = None
	dialog.Destroy()
	return path


def getDuplicateColumns(df):
	"""
	Get a list of duplicate columns.
	It will iterate over all the columns in dataframe and find the columns whose contents are duplicate.
	:param df: Dataframe object
	:return: List of columns whose contents are duplicates.
	"""
	duplicateColumnNames = set()
	# Iterate over all the columns in dataframe
	for x in range(df.shape[1]):
		# Select column at xth index.
		col = df.iloc[:, x]
		# Iterate over all the columns in DataFrame from (x+1)th index till end
		for y in range(x + 1, df.shape[1]):
			# Select column at yth index.
			otherCol = df.iloc[:, y]
			# Check if two columns at x 7 y index are equal
			if col.equals(otherCol):
				duplicateColumnNames.add(df.columns.values[y])

	return list(duplicateColumnNames)


@eel.expose
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
	columnsHavingSameValue = [(i, j) for i, j in combinations(dataFrame, 2) if dataFrame[i].equals(dataFrame[j])]
	if len(columnsHavingSameValue) > 0:
		columnsHavingSameValue = columnsHavingSameValue[0]
	print("Columns: " + str(columns) + "\nRows: " + str(rows) + "\nEmpty Cells: " + str(
		emptyCellsCount) + "\nMissing Rate: " + str(missingRate) + "%" + "\nFull Empty Columns: " + str(
		len(fullEmptyColumns)) + "\nDuplicated Header: " + str(
		len(duplicateHeaderNames)) + "\nSingle value column: " + str(
		len(singleValueColumn)) + "\nColumn with Missing Data: " + str(
		len(anyValueMissingColumn)) + "\nDuplicate Rows: " + str(len(duplicateRows)) + "\nIncomplete Rows: " + str(
		anyValueMissingRow) + "\nColumns with Same Value: " + str(len(
		columnsHavingSameValue)))

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
	mainDF = list(dataFrame.head(0))
	# print(duplicateHeaderArray)
	for key, col in enumerate(duplicateHeaderNames):
		# print('Duplicate header name : ', [col][0])
		print('Duplicate header name : ', mainDF[col])
		# print('Duplicate header name : ', columnList[col][0])
		# duplicateHeaderArray[key] = columnList[col][0]
		duplicateHeaderArray[key] = mainDF[col]

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

	columnsHavingSameValueArray = [""] * len(columnsHavingSameValue)
	for key, col in enumerate(columnsHavingSameValue):
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

	response = {
		'Columns': str(columns),
		'Rows': str(rows),
		'Missing Rate': str(missingRate) + "%",
		'Empty Columns': str(len(fullEmptyColumns)),
		'Duplicated Header': str(len(duplicateHeaderNames)),
		'Single Value Column': str(len(singleValueColumn)),
		'Column with Missing Data': str(len(anyValueMissingColumn)),
		'Duplicate Rows': str(len(duplicateRows)),
		'Incomplete Rows': str(anyValueMissingRow),
		'Columns with Same Value': str(len(columnsHavingSameValue)),
		'dataMap': cellMapping.tolist(),
		'duplicateHeadMap': duplicateMapping.tolist(),
		'duplicateHeaderArray': duplicateHeaderArray,
		'singleValueColumnArray': singleValueColumnArray,
		'anyValueMissingColumnArray': anyValueMissingColumnArray,
		'columnsHavingSameValueArray': columnsHavingSameValueArray,
		'missingMapping': missingMapping.tolist()
	}

	# df.drop_duplicates(subset=['A', 'C'], keep=False) keep first / last

	return response


@eel.expose
def startCleansing(actions):
	global dataFrame

	allActions = actions.split("&")
	for item in allActions:
		if item[:2] == "IR":
			if item[-4:] != "KEEP":
				print("Remove incomplete rows")
				dataFrame = dataFrame.dropna()

		if item[:2] == "DR":
			if item[-4:] != "KEEP":
				# print("Remove duplicate rows")
				dataFrame = dataFrame.drop_duplicates(keep=False)

		if item[:4] == "SAME":
			if item[-4:] != "KEEP":
				# print("Remove columns with same value")
				splitItem = item.split('=')[1]
				splitItem = splitItem[:-6]
				# print(splitItem)
				if splitItem in dataFrame.columns:
					dataFrame.drop(splitItem, axis=1, inplace=True)

		if item[:7] == "MISSING":
			if item[-4:] != "KEEP":
				print("Remove missing data column")
				splitItem = item.split('=')[1]
				splitItem = splitItem[:-6]
				# print(splitItem)
				if splitItem in dataFrame.columns:
					dataFrame.drop(splitItem, axis=1, inplace=True)

		if item[:6] == "SINGLE":
			if item[-4:] != "KEEP":
				print("Remove single value column")
				splitItem = item.split('=')[1]
				splitItem = splitItem[:-6]
				# print(splitItem)
				if splitItem in dataFrame.columns:
					dataFrame.drop(splitItem, axis=1, inplace=True)

		if item[:9] == "DUPLICATE":
			if item[-4:] != "KEEP":
				print("Remove duplicate column name")
				splitItem = item.split('=')[1]
				splitItem = splitItem[:-6]
				# print(splitItem)
				if splitItem in dataFrame.columns:
					dataFrame.drop(splitItem, axis=1, inplace=True)

	if not os.path.exists('Output'):
		os.mkdir('Output')

	fileName = 'CSV_' + datetime.datetime.now().strftime("%d%m%Y%H%M%S") + '.csv'

	dataFrame.to_csv(r'Output\\' + fileName, index=False, header=True)

	return fileName


if __name__ == '__main__':
	application_path = ""
	if getattr(sys, 'frozen', False):
		application_path = os.path.dirname(sys.executable)
	elif __file__:
		application_path = os.path.dirname(__file__)
		# Join application path and relative file path
	filename = 'web'
	pathtofile = os.path.join(application_path, filename)
	eel.init(pathtofile, allowed_extensions=['.js', '.html'])
	eel.start('index.html', mode='chrome-app', port=0, size=(1400, 900))
	# eel.start('index.html', port=0, size=(1400, 900))
