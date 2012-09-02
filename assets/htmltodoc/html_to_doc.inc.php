<?php
	/**
	 * Convert HTML to MS Word file
	 * @author Harish Chauhan
	 * @version 1.0.0
	 * @name HTML_TO_DOC
	 */
	
	class HTML_TO_DOC
	{
		var $docFile="";
		var $title="";
		var $htmlHead="";
		var $htmlBody="";
		
		
		/**
		 * Constructor
		 *
		 * @return void
		 */
		function HTML_TO_DOC()
		{
			$this->title="Untitled Document";
			$this->htmlHead="";
			$this->htmlBody="";
		}
		
		/**
		 * Set the document file name
		 *
		 * @param String $docfile 
		 */
		
		function setDocFileName($docfile)
		{
			$this->docFile=$docfile;
			if(!preg_match("/\.doc$/i",$this->docFile))
				$this->docFile.=".doc";
			return;		
		}
		
		function setTitle($title)
		{
			$this->title=$title;
		}
		
		/**
		 * Return header of MS Doc
		 *
		 * @return String
		 */
		function getHeader()
		{
			$return  = <<<EOH
			 <html xmlns:v="urn:schemas-microsoft-com:vml"
			xmlns:o="urn:schemas-microsoft-com:office:office"
			xmlns:w="urn:schemas-microsoft-com:office:word"
			xmlns="http://www.w3.org/TR/REC-html40">
			
			<body>
EOH;
		return $return;
		}
		
		/**
		 * Return Document footer
		 *
		 * @return String
		 */
		function getFotter()
		{
			return "</body></html>";
		}
		
		/**
		 * Create The MS Word Document from given HTML
		 *
		 * @param String $html :: URL Name like http://www.example.com
		 * @param String $file :: Document File Name
		 * @param Boolean $download :: Wheather to download the file or save the file
		 * @return boolean 
		 */
		
		function createDocFromURL($url,$file,$download=false)
		{
			if(!preg_match("/^http:/",$url))
				$url="http://".$url;
			$html=@file_get_contents($url);
			return $this->createDoc($html,$file,$download);	
		}

		/**
		 * Create The MS Word Document from given HTML
		 *
		 * @param String $html :: HTML Content or HTML File Name like path/to/html/file.html
		 * @param String $file :: Document File Name
		 * @param Boolean $download :: Wheather to download the file or save the file
		 * @return boolean 
		 */
		
		function createDoc($html,$file,$download=false)
		{
			if(is_file($html))
				$html=@file_get_contents($html);
			
			$this->_parseHtml($html);
			$this->setDocFileName($file);
			$doc=$this->getHeader();
			$doc.=$this->htmlBody;
			$doc.=$this->getFotter();
							
			if($download)
			{
				@header("Cache-Control: ");// leave blank to avoid IE errors
				@header("Pragma: ");// leave blank to avoid IE errors
				@header("Content-type: application/octet-stream");
				@header("Content-Disposition: attachment; filename=\"$this->docFile\"");
				echo $doc;
				return true;
			}
			else 
			{
				return $this->write_file($this->docFile,$doc);
			}
		}
		
		/**
		 * Parse the html and remove <head></head> part if present into html
		 *
		 * @param String $html
		 * @return void
		 * @access Private
		 */
		
		function _parseHtml($html)
		{
			$html=preg_replace("/<!DOCTYPE((.|\n)*?)>/ims","",$html);
			$html=preg_replace("/<script((.|\n)*?)>((.|\n)*?)<\/script>/ims","",$html);
			preg_match("/<head>((.|\n)*?)<\/head>/ims",$html,$matches);
			$head=$matches[1];
			preg_match("/<title>((.|\n)*?)<\/title>/ims",$head,$matches);
			$this->title = $matches[1];
			$html=preg_replace("/<head>((.|\n)*?)<\/head>/ims","",$html);
			$head=preg_replace("/<title>((.|\n)*?)<\/title>/ims","",$head);
			$head=preg_replace("/<\/?head>/ims","",$head);
			$html=preg_replace("/<\/?body((.|\n)*?)>/ims","",$html);
			$this->htmlHead=$head;
			$this->htmlBody=$html;
			return;
		}
		
		/**
		 * Write the content int file
		 *
		 * @param String $file :: File name to be save
		 * @param String $content :: Content to be write
		 * @param [Optional] String $mode :: Write Mode
		 * @return void
		 * @access boolean True on success else false
		 */
		
		function write_file($file,$content,$mode="w")
		{
			$fp=@fopen($file,$mode);
			if(!is_resource($fp))
				return false;
			fwrite($fp,$content);
			fclose($fp);
			return true;
		}

	}

?>